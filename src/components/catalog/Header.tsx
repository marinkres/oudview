import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full h-24 flex items-center justify-center border-b bg-background">
      <Link
        to="/"
        className="text-4xl font-light tracking-widest hover:opacity-80 transition-opacity"
      >
        OUDVIEW
      </Link>
    </header>
  );
};

export default Header;
