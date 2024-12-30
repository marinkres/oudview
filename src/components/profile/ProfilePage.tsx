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
import { Card, CardContent } from "@/components/ui/card";

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredFragrances, setFilteredFragrances] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [userCollection, setUserCollection] = useState<any[]>([]);

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

  const { data: allFragrances } = useQuery({
    queryKey: ["allFragrances"],
    queryFn: async () => {
      const { data, error } = await supabase.from("fragrances").select("*");
      if (error) throw error;
      return data;
    },
  });

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

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredFragrances([]);
    } else {
      const filtered = allFragrances?.filter((fragrance: any) =>
        fragrance.name.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 2);

      setFilteredFragrances(filtered || []);
    }
  }, [searchTerm, allFragrances]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUserId(user?.id || null);
    };
    fetchCurrentUser();
  }, []);

  const handleAddToCollection = (fragranceId: string) => {
    if (!currentUserId) {
      console.error("No user is currently logged in");
      return;
    }

    if (currentUserId !== id) {
      console.error("You can only add fragrances to your own collection");
      return;
    }

    if (userCollection.some((fragrance) => fragrance.id === fragranceId)) {
      console.error("This fragrance is already in your collection");
      return;
    }

    const addFragrance = async () => {
      const { error } = await supabase
        .from("collections")
        .insert([{ user_id: currentUserId, fragrance_id: fragranceId }]);
      if (error) {
        console.error("Error adding fragrance to collection", error);
      } else {
        setUserCollection((prevCollection) => [
          ...prevCollection,
          allFragrances?.find((fragrance) => fragrance.id === fragranceId),
        ]);
        setIsModalOpen(false);
      }
    };

    addFragrance();
  };

  const handleDeleteFromCollection = async (fragranceId: string) => {
    if (!currentUserId || currentUserId !== id) {
      console.error("You can only delete fragrances from your own collection");
      return;
    }

    const { error } = await supabase
      .from("collections")
      .delete()
      .eq("user_id", currentUserId)
      .eq("fragrance_id", fragranceId);

    if (error) {
      console.error("Error deleting fragrance from collection", error);
    } else {
      setUserCollection((prevCollection) =>
        prevCollection.filter((fragrance) => fragrance.id !== fragranceId)
      );
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-6 py-12">
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

          <Tabs defaultValue="reviews">
            <TabsList>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="collection">Collection</TabsTrigger>
            </TabsList>

            <TabsContent value="reviews" className="mt-6">
              <div className="grid gap-6">
                {reviews?.map((review) => (
                  <div key={review.id} className="border rounded-lg p-6">
                    <h3 className="text-xl font-medium mb-2">
                      <a href={`/fragrance/${review.fragrances.id}`} className="hover:text-grey-500">
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

            <TabsContent value="collection" className="mt-6">
              {currentUserId === id && (
                <Button onClick={() => setIsModalOpen(true)} className="mb-6">Add to Collection</Button>
              )}
              <div>
                <h2 className="text-2xl font-medium mb-4">
                  {currentUserId === id ? "Your Collection" : `${profile?.username}'s Collection`}
                </h2>
                {userCollection.length === 0 ? (
                  <p className="text-muted-foreground">
                    {currentUserId === id
                      ? "No fragrances in your collection yet."
                      : `No fragrances in ${profile?.username}'s collection yet.`}
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userCollection.map((fragrance) => (
                      <Card key={fragrance.id} className="overflow-hidden">
                        <CardContent className="p-4">
                          <h3 className="text-lg font-semibold mb-2">{fragrance.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{fragrance.brand}</p>
                          <div className="flex justify-between text-sm">
                            <span>{fragrance.category}</span>
                            <span>{fragrance.release_year}</span>
                          </div>
                          {currentUserId === id && (
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteFromCollection(fragrance.id)}
                              className="mt-2"
                            >
                              Delete
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

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

