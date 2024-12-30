import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import Header from "../catalog/Header";
import Footer from "../catalog/Footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PerfumeGrid from "../catalog/PerfumeGrid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalCloseButton } from "@/components/ui/modal";

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();

  // State for search input and filtered fragrances
  const [searchTerm, setSearchTerm] = useState<string>(""); 
  const [filteredFragrances, setFilteredFragrances] = useState<any[]>([]); // State for filtered fragrances
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State to control modal visibility

  // State for user's collection of fragrances
  const [userCollection, setUserCollection] = useState<any[]>([]);

  // Fetch profile data
  const { data: profile } = useQuery({
    queryKey: ["profile", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data;
    },
  });

  // Fetch reviews data
  const { data: reviews } = useQuery({
    queryKey: ["userReviews", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select(`*, fragrances (*)`)
        .eq("user_id", id);
      if (error) throw error;
      return data;
    },
  });

  // Fetch all fragrances (for searching)
  const { data: allFragrances } = useQuery({
    queryKey: ["allFragrances"],
    queryFn: async () => {
      const { data, error } = await supabase.from("fragrances").select("*");
      if (error) throw error;
      return data;
    },
  });

  // Fetch user's collection (fragrances)
  const { data: userCollectionData } = useQuery({
    queryKey: ["userCollection", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("collections")
        .select("fragrance_id, fragrances(*)")
        .eq("user_id", id);
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    if (userCollectionData) {
      setUserCollection(userCollectionData.map((item: any) => item.fragrances));
    }
  }, [userCollectionData]);

  // Handle the search functionality
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredFragrances([]); // No results if search is empty
    } else {
      // Filter fragrances based on name and limit to the top 2
      const filtered = allFragrances?.filter((fragrance: any) =>
        fragrance.name.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 2); // Only keep the top 2 results

      setFilteredFragrances(filtered || []);
    }
  }, [searchTerm, allFragrances]);

  const handleAddToCollection = (fragranceId: string) => {
    // Add fragrance to user's collection in the database
    const addFragrance = async () => {
      const { error } = await supabase
        .from("collections")
        .insert([{ user_id: id, fragrance_id: fragranceId }]);
      if (error) {
        console.error("Error adding fragrance to collection", error);
      } else {
        setUserCollection((prevCollection) => [
          ...prevCollection,
          allFragrances?.find((fragrance) => fragrance.id === fragranceId),
        ]);
        setIsModalOpen(false); // Close the modal after adding
      }
    };

    addFragrance();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Profile Header */}
          <div className="flex items-center gap-6 mb-12">
            <Avatar className="h-24 w-24">
              <AvatarImage src={profile?.avatar_url} />
              <AvatarFallback>
                {profile?.username?.[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-4xl font-light tracking-tight">{profile?.username}</h1>
              <p className="text-lg text-muted-foreground">{profile?.full_name}</p>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="reviews">
            <TabsList>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="collection">Collection</TabsTrigger>
            </TabsList>

            {/* Reviews Tab */}
            <TabsContent value="reviews" className="mt-6">
              <div className="grid gap-6">
                {reviews?.map((review) => (
                  <div key={review.id} className="border rounded-lg p-6">
                    <h3 className="text-xl font-medium mb-2">
                      <a href={`/fragrance/${review.fragrances.id}`} className="hover:text-blue-500">
                        {review.fragrances.name}
                      </a>
                    </h3>
                    <p className="text-muted-foreground mb-4">{review.comment}</p>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>Longevity: {review.longevity}/10</div>
                      <div>Sillage: {review.sillage}/10</div>
                      <div>Value: {review.value_for_money}/5</div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Collection Tab */}
            <TabsContent value="collection" className="mt-6">
              <Button onClick={() => setIsModalOpen(true)}>Add to Collection</Button>
              <div className="mt-6">
                <h2 className="text-2xl font-medium">Your Collection</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                  {userCollection.length === 0 ? (
                    <p>No fragrances in your collection yet.</p>
                  ) : (
                    userCollection.map((fragrance) => (
                      <div key={fragrance.id} className="border p-4 rounded-lg">
                        <h3 className="text-xl font-medium">{fragrance.name}</h3>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Modal for Searching and Adding Fragrances */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalHeader>Search for Fragrances</ModalHeader>
        <ModalBody>
          <Input
            type="text"
            placeholder="Search for a fragrance"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {filteredFragrances.length > 0 && (
            <div className="mt-4">
              <h3>Results:</h3>
              <ul>
                {filteredFragrances.map((fragrance) => (
                  <li key={fragrance.id} className="flex justify-between items-center">
                    <span>{fragrance.name}</span>
                    <Button
                      onClick={() => handleAddToCollection(fragrance.id)}
                      className="ml-2"
                    >
                      Add
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {filteredFragrances.length === 0 && searchTerm && (
            <p>No fragrances found for "{searchTerm}".</p>
          )}
        </ModalBody>
        <ModalFooter>
          <ModalCloseButton onClick={() => setIsModalOpen(false)} />
        </ModalFooter>
      </Modal>

      <Footer />
    </div>
  );
};

export default ProfilePage;
