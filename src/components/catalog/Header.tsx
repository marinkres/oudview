import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/hooks/useAuth";
import { Button } from "@/components/ui/button";
import AuthModal from "@/components/auth/AuthModal";
import { supabase } from "@/lib/supabase";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
        <Link
          to="/search"
          className="text-lg font-small text-muted-foreground hover:underline transition-all"
        >
          Search
        </Link>

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {profile?.username?.[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to={`/profile/${user.id}`} className="cursor-pointer">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
