import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
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
      <nav className="flex gap-8 mt-4">
        <Link
          to="/search"
          className="text-lg font-small underlinetext-muted-foreground hover:underline transition-all"
        >
          Search
        </Link>
        <Link
          to="/#"
          className="text-lg font-small text-muted-foreground hover:underline transition-all"
        >
          Profile
        </Link>
        <Link
          to="/#"
          className="text-lg font-small text-muted-foreground hover:underline transition-all"
        >
          Login
        </Link>
      </nav>
    </header>
  );
};

export default Header;
