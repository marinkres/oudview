import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Droplets,
  Wind,
  Coins,
  Calendar,
  Beaker,
  Users,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Header from "./Header";
import Footer from "./Footer";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/hooks/useAuth";
import AuthModal from "../auth/AuthModal";
import { useToast } from "@/components/ui/use-toast";
import { noteColors } from "@/lib/data/perfumes";

const FragrancePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [newReview, setNewReview] = useState({
    comment: "",
    longevity: 5,
    sillage: 5,
    valueForMoney: 3,
  });

  // Scroll to top when the component is mounted or when `id` changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const { data: fragrance, isLoading: isLoadingFragrance } = useQuery({
    queryKey: ["fragrance", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("fragrances")
        .select()
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const { data: reviews, isLoading: isLoadingReviews } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select(
          `
          *,
          profiles:user_id (username)
        `,
        )
        .eq("fragrance_id", id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const createReviewMutation = useMutation({
    mutationFn: async (reviewData: {
      comment: string;
      longevity: number;
      sillage: number;
      valueForMoney: number;
    }) => {
      const { error } = await supabase.from("reviews").insert({
        user_id: user?.id,
        fragrance_id: id,
        comment: reviewData.comment,
        longevity: reviewData.longevity,
        sillage: reviewData.sillage,
        value_for_money: reviewData.valueForMoney,
        rating: Math.round(
          (reviewData.longevity +
            reviewData.sillage +
            reviewData.valueForMoney) /
            3,
        ),
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", id] });
      setNewReview({
        comment: "",
        longevity: 5,
        sillage: 5,
        valueForMoney: 3,
      });
      toast({
        title: "Review submitted",
        description: "Thank you for sharing your thoughts!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleReviewSubmit = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    if (!newReview.comment) {
      toast({
        title: "Error",
        description: "Please write a comment",
        variant: "destructive",
      });
      return;
    }

    createReviewMutation.mutate(newReview);
  };

  const renderMetric = (
    icon: React.ReactNode,
    label: string,
    value: number,
    max: number = 10,
    onChange?: (value: number) => void,
  ) => (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className="flex gap-1">
        {Array.from({ length: max }).map((_, i) => (
          <div
            key={i}
            onClick={() => onChange?.(i + 1)}
            className={`w-6 h-2 rounded-sm transition-colors ${
              i < value ? "bg-primary" : "bg-primary/10"
            } ${onChange ? "cursor-pointer hover:bg-primary/50" : ""}`}
          />
        ))}
      </div>
    </div>
  );

  const renderNoteSection = (title: string, notes: string[]) => (
    <div className="space-y-3">
      <h3 className="text-lg font-medium">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {notes.map((note, i) => (
          <span
            key={i}
            className={`px-3 py-1.5 rounded-full text-sm text-gray-700 transition-colors ${noteColors[note] || "bg-gray-100"}`}
          >
            {note}
          </span>
        ))}
      </div>
    </div>
  );

  if (isLoadingFragrance) {
    return <div>Loading...</div>;
  }

  if (!fragrance) {
    return <div>Fragrance not found</div>;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
          <Button variant="ghost" className="mb-8" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div className="space-y-8">
            {/* Header Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div className="col-span-4 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-4xl font-light tracking-tight">
                      {fragrance.name}
                    </h1>
                    <p className="text-xl text-muted-foreground mt-2">
                      {fragrance.brand}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-sm font-medium px-4 py-2 bg-primary/5 rounded-full">
                      {fragrance.gender}
                    </span>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      Released in {fragrance.year}
                    </div>
                  </div>
                </div>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {fragrance.description}
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-muted/20 rounded-lg">
              <div className="flex items-center gap-2">
                <Beaker className="h-5 w-5 text-primary/70" />
                <div>
                  <div className="text-sm font-medium">
                    {fragrance.concentration}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Concentration
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary/70" />
                <div>
                  <div className="text-sm font-medium">{fragrance.gender}</div>
                  <div className="text-xs text-muted-foreground">Gender</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-primary/70" />
                <div>
                  <div className="text-sm font-medium">{fragrance.year}</div>
                  <div className="text-xs text-muted-foreground">
                    Release Year
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Coins className="h-5 w-5 text-primary/70" />
                <div>
                  <div className="text-sm font-medium">
                    {"$".repeat(fragrance.price_value)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Price Range
                  </div>
                </div>
              </div>
            </div>

            {/* Notes Pyramid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {renderNoteSection("Top Notes", fragrance.top_notes)}
              {renderNoteSection("Heart Notes", fragrance.heart_notes)}
              {renderNoteSection("Base Notes", fragrance.base_notes)}
            </div>

            {/* Performance Metrics */}
            <div className="space-y-6 pt-6 border-t">
              <h3 className="text-lg font-medium mb-4">Performance</h3>
              {renderMetric(
                <Droplets className="h-5 w-5" />,
                "Longevity",
                fragrance.longevity,
              )}
              {renderMetric(
                <Wind className="h-5 w-5" />,
                "Sillage",
                fragrance.sillage,
              )}
              {renderMetric(
                <Coins className="h-5 w-5" />,
                "Value for Money",
                fragrance.price_value,
                5,
              )}
            </div>

            {/* Reviews Section */}
            <div className="space-y-8 pt-8 border-t">
              <h3 className="text-lg font-medium">Reviews</h3>

              {/* Write Review Section */}
              {user ? (
                <div className="space-y-6 bg-card p-6 rounded-lg border">
                  <Textarea
                    placeholder="Write your review..."
                    value={newReview.comment}
                    onChange={(e) =>
                      setNewReview((prev) => ({
                        ...prev,
                        comment: e.target.value,
                      }))
                    }
                  />
                  <div className="space-y-4">
                    {renderMetric(
                      <Droplets className="h-4 w-4" />,
                      "Longevity",
                      newReview.longevity,
                      10,
                      (value) =>
                        setNewReview((prev) => ({ ...prev, longevity: value })),
                    )}
                    {renderMetric(
                      <Wind className="h-4 w-4" />,
                      "Sillage",
                      newReview.sillage,
                      10,
                      (value) =>
                        setNewReview((prev) => ({ ...prev, sillage: value })),
                    )}
                    {renderMetric(
                      <Coins className="h-4 w-4" />,
                      "Value for Money",
                      newReview.valueForMoney,
                      5,
                      (value) =>
                        setNewReview((prev) => ({
                          ...prev,
                          valueForMoney: value,
                        })),
                    )}
                  </div>
                  <Button
                    onClick={handleReviewSubmit}
                    disabled={createReviewMutation.isPending}
                  >
                    {createReviewMutation.isPending
                      ? "Submitting..."
                      : "Submit Review"}
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center space-y-4 py-8">
                  <p className="text-muted-foreground">
                    Sign in to write a review
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setShowAuthModal(true)}
                  >
                    Sign In
                  </Button>
                </div>
              )}

              {/* Display Reviews */}
              {isLoadingReviews ? (
                <div>Loading reviews...</div>
              ) : (
                <div className="space-y-4">
                  {reviews?.map((review) => (
                    <div key={review.id} className="p-4 border rounded-md">
                      <div className="flex items-center gap-2">
                        <strong>{review.profiles?.username}</strong>
                      </div>
                      <div className="mt-2 text-muted-foreground">
                        <p>
                          <strong>Sillage:</strong> {review.sillage}/10
                        </p>
                        <p>
                          <strong>Longevity:</strong> {review.longevity}/10
                        </p>
                        <p>
                          <strong>Value for Money:</strong>{" "}
                          {review.value_for_money}/5
                        </p>
                      </div>
                      <p className="mt-2 text-muted-foreground">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
};

export default FragrancePage;
