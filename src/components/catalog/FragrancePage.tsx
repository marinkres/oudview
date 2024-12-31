import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Droplets,
  Wind,
  Coins,
  Calendar,
  Beaker,
  Users,
  Star,
  MoreVertical,
  Pencil,
  Trash2,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const FragrancePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [editingReview, setEditingReview] = useState<any>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
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

  const updateReviewMutation = useMutation({
    mutationFn: async (reviewData: any) => {
      const { error } = await supabase
        .from("reviews")
        .update({
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
        })
        .eq("id", reviewData.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", id] });
      setShowEditDialog(false);
      setEditingReview(null);
      toast({
        title: "Review updated",
        description: "Your review has been updated successfully!",
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

  const deleteReviewMutation = useMutation({
    mutationFn: async (reviewId: string) => {
      const { error } = await supabase
        .from("reviews")
        .delete()
        .eq("id", reviewId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", id] });
      toast({
        title: "Review deleted",
        description: "Your review has been deleted successfully.",
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

  const handleEditClick = (review: any) => {
    setEditingReview({
      ...review,
      valueForMoney: review.value_for_money,
    });
    setShowEditDialog(true);
  };

  const handleDeleteClick = (reviewId: string) => {
    if (confirm("Are you sure you want to delete this review?")) {
      deleteReviewMutation.mutate(reviewId);
    }
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
                <p className="text-muted-foreground"> Discover the In-Depth Reviews and Exclusive Insights from Our Expert Curators, Carefully Selected for Their Unmatched Knowledge and Experience. </p> 
                {/* Write Review Section */} 
                {user ? ( 
                  <div className="space-y-6 bg-card p-6 rounded-lg border"> 
                  <Textarea placeholder="Write your review..." value={newReview.comment} onChange={(e) => setNewReview((prev) => ({ ...prev, comment: e.target.value, })) } /> 
                    <div className="space-y-4"> 
                      {renderMetric( <Droplets className="h-4 w-4" />, "Longevity", newReview.longevity, 10, (value) => setNewReview((prev) => ({ ...prev, longevity: value })), )} 
                      {renderMetric( <Wind className="h-4 w-4" />, "Sillage", newReview.sillage, 10, (value) => setNewReview((prev) => ({ ...prev, sillage: value })), )} 
                      {renderMetric( <Coins className="h-4 w-4" />, "Value for Money", newReview.valueForMoney, 5, (value) => setNewReview((prev) => ({ ...prev, valueForMoney: value, })), )} 
                      </div> 
                      <Button onClick={handleReviewSubmit} disabled={createReviewMutation.isPending} > {createReviewMutation.isPending ? "Submitting..." : "Submit Review"} </Button> 
                      </div> ) : ( 
                        <div className="flex flex-col space-y-2"> 
                        <p className="text-muted-foreground"> 
                          <a href="#" onClick={() => setShowAuthModal(true)} className="underline"> Join Our Team </a> </p> 
                          </div> 
                        )}
              {/* Display Reviews */}
              {isLoadingReviews ? (
                <div>Loading reviews...</div>
              ) : (
                <div className="space-y-4">
                  {reviews?.map((review) => (
                    <div key={review.id} className="p-4 border rounded-md">
                      <div className="flex items-center justify-between">
                        <Link
                          to={`/profile/${review.user_id}`}
                          className="font-medium hover:underline"
                        >
                          {review.profiles?.username}
                        </Link>
                        {user?.id === review.user_id && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => handleEditClick(review)}
                              >
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={() => handleDeleteClick(review.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
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

      {/* Edit Review Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Review</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <Textarea
              placeholder="Write your review..."
              value={editingReview?.comment || ""}
              onChange={(e) =>
                setEditingReview((prev: any) => ({
                  ...prev,
                  comment: e.target.value,
                }))
              }
            />
            <div className="space-y-4">
              {renderMetric(
                <Droplets className="h-4 w-4" />,
                "Longevity",
                editingReview?.longevity || 5,
                10,
                (value) =>
                  setEditingReview((prev: any) => ({
                    ...prev,
                    longevity: value,
                  })),
              )}
              {renderMetric(
                <Wind className="h-4 w-4" />,
                "Sillage",
                editingReview?.sillage || 5,
                10,
                (value) =>
                  setEditingReview((prev: any) => ({
                    ...prev,
                    sillage: value,
                  })),
              )}
              {renderMetric(
                <Coins className="h-4 w-4" />,
                "Value for Money",
                editingReview?.valueForMoney || 3,
                5,
                (value) =>
                  setEditingReview((prev: any) => ({
                    ...prev,
                    valueForMoney: value,
                  })),
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => updateReviewMutation.mutate(editingReview)}
              disabled={updateReviewMutation.isPending}
            >
              {updateReviewMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FragrancePage;
