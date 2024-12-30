import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/hooks/useAuth";
import { Button } from "@/components/ui/button";
import AuthModal from "@/components/auth/AuthModal";
import { supabase } from "@/lib/supabase";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";

const Header = () => {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = React.useState(false);

  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="w-full h-32 flex flex-col items-center justify-center border-b bg-background">
      {/* Logo */}
      <Link
        to="/"
        className="text-4xl font-light tracking-widest hover:opacity-80 transition-opacity"
      >
        OUDVIEW
      </Link>

      {/* Navigation Links */}
      <nav className="flex gap-8 mt-4 items-center">
        {/* Home Link */}
        <Link
          to="/"
          className="text-lg font-small text-muted-foreground hover:underline transition-all"
        >
          Home
        </Link>

        {/* Search Link */}
        <Link
          to="/search"
          className="text-lg font-small text-muted-foreground hover:underline transition-all"
        >
          Search
        </Link>

        {user ? (
          <div className="flex items-center gap-4">
            {/* Profile Avatar and Text */}
            <Link
              to={`/profile/${user.id}`}
              className="flex items-center gap-2 text-lg font-small text-muted-foreground"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  {profile?.username?.[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              Profile
            </Link>

            {/* Logout Button */}
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="text-lg font-small text-muted-foreground hover:underline transition-all"
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            variant="ghost"
            onClick={() => setShowAuthModal(true)}
            className="text-lg font-small text-muted-foreground hover:underline transition-all"
          >
            Login
          </Button>
        )}
      </nav>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </header>
  );
};

export default Header;
