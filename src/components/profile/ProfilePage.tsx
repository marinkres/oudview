import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import Header from "../catalog/Header";
import Footer from "../catalog/Footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PerfumeGrid from "../catalog/PerfumeGrid";

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();

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
        .select(
          `
          *,
          fragrances (*)
        `,
        )
        .eq("user_id", id);

      if (error) throw error;
      return data;
    },
  });

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
              <h1 className="text-4xl font-light tracking-tight">
                {profile?.username}
              </h1>
              <p className="text-lg text-muted-foreground">
                {profile?.full_name}
              </p>
            </div>
          </div>

          {/* Tabs */}
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
                      {review.fragrances.name}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {review.comment}
                    </p>
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
              <PerfumeGrid />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
