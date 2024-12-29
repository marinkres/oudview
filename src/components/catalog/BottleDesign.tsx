import React from "react";

interface BottleDesignProps {
  id: string;
  className?: string;
}

const designs: Record<string, React.FC<{ className?: string }>> = {
  "1": (
    { className }, // Bleu de Chanel - rectangular with cap
  ) => (
    <svg
      className={className}
      viewBox="0 0 100 160"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="20" y="40" width="60" height="100" rx="2" />
      <rect x="30" y="20" width="40" height="20" rx="2" />
      {/* Logo and details */}
      <path d="M35 70 H65" strokeWidth="1" />
      <path d="M40 80 H60" strokeWidth="1" />
      <path d="M45 90 H55" strokeWidth="1" />
      <circle cx="50" cy="110" r="15" strokeWidth="1" />
      <path d="M40 110 H60" strokeWidth="1" />
      <path d="M50 100 V120" strokeWidth="1" />
    </svg>
  ),
  "2": (
    { className }, // Light Blue - curved bottle
  ) => (
    <svg
      className={className}
      viewBox="0 0 100 160"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M30 140 Q30 40 50 40 Q70 40 70 140" />
      <path d="M40 20 Q50 15 60 20 L60 40 L40 40 L40 20" />
      {/* Wave patterns */}
      <path d="M35 60 Q50 55 65 60" strokeWidth="1" />
      <path d="M35 80 Q50 75 65 80" strokeWidth="1" />
      <path d="M35 100 Q50 95 65 100" strokeWidth="1" />
      <path d="M35 120 Q50 115 65 120" strokeWidth="1" />
    </svg>
  ),
  "3": (
    { className }, // Black Orchid - art deco style
  ) => (
    <svg
      className={className}
      viewBox="0 0 100 160"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M35 140 L35 60 Q50 40 65 60 L65 140" />
      <path d="M40 40 Q50 20 60 40" />
      {/* Art deco patterns */}
      <path d="M40 70 L60 70" strokeWidth="1" />
      <path d="M37 80 L63 80" strokeWidth="1" />
      <path d="M35 90 L65 90" strokeWidth="1" />
      <path d="M37 100 L63 100" strokeWidth="1" />
      <path d="M40 110 L60 110" strokeWidth="1" />
      {/* Decorative top */}
      <path d="M45 30 L55 30" strokeWidth="1" />
      <circle cx="50" cy="25" r="3" strokeWidth="1" />
    </svg>
  ),
  "4": (
    { className }, // Aventus - regal bottle
  ) => (
    <svg
      className={className}
      viewBox="0 0 100 160"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M30 140 L30 60 Q50 50 70 60 L70 140" />
      {/* Crown design */}
      <path d="M40 20 L50 30 L60 20" />
      <circle cx="40" cy="15" r="3" />
      <circle cx="50" cy="25" r="3" />
      <circle cx="60" cy="15" r="3" />
      {/* Decorative patterns */}
      <path d="M40 80 L60 80" strokeWidth="1" />
      <path d="M35 100 Q50 95 65 100" strokeWidth="1" />
      <rect x="40" y="110" width="20" height="20" rx="2" strokeWidth="1" />
    </svg>
  ),
  "5": (
    { className }, // La Vie Est Belle - curved with crystal
  ) => (
    <svg
      className={className}
      viewBox="0 0 100 160"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M30 140 Q30 60 50 50 Q70 60 70 140" />
      {/* Crystal bow design */}
      <path d="M35 40 Q50 30 65 40" />
      <path d="M45 30 Q50 20 55 30" />
      <path d="M40 35 Q50 45 60 35" />
      {/* Decorative swirls */}
      <path d="M35 70 Q50 60 65 70" strokeWidth="1" />
      <path d="M35 90 Q50 80 65 90" strokeWidth="1" />
      <path d="M35 110 Q50 100 65 110" strokeWidth="1" />
    </svg>
  ),
  "6": (
    { className }, // Santal 33 - laboratory style
  ) => (
    <svg
      className={className}
      viewBox="0 0 100 160"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="35" y="40" width="30" height="100" />
      <path d="M40 20 L40 40 L60 40 L60 20" />
      {/* Lab markings */}
      <path d="M40 60 L60 60" strokeWidth="1" />
      <path d="M40 80 L60 80" strokeWidth="1" />
      <path d="M40 100 L60 100" strokeWidth="1" />
      <path d="M45 70 L55 70" strokeWidth="1" />
      <path d="M45 90 L55 90" strokeWidth="1" />
      <path d="M45 110 L55 110" strokeWidth="1" />
      {/* Numbers */}
      <path d="M42 120 L45 120" strokeWidth="1" />
      <path d="M42 130 L48 130" strokeWidth="1" />
    </svg>
  ),
  "7": (
    { className }, // J'adore - iconic curved
  ) => (
    <svg
      className={className}
      viewBox="0 0 100 160"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M40 140 Q25 100 40 60 Q50 40 60 60 Q75 100 60 140" />
      {/* Necklace design */}
      <path d="M45 40 Q50 30 55 40" />
      <circle cx="50" cy="35" r="2" />
      {/* Decorative rings */}
      <path d="M35 80 Q50 75 65 80" strokeWidth="1" />
      <path d="M32 100 Q50 95 68 100" strokeWidth="1" />
      <path d="M35 120 Q50 115 65 120" strokeWidth="1" />
    </svg>
  ),
  "8": (
    { className }, // Oud Wood - angular luxury
  ) => (
    <svg
      className={className}
      viewBox="0 0 100 160"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M30 140 L40 40 L60 40 L70 140" />
      <path d="M45 20 L45 40 L55 40 L55 20" />
      {/* Geometric patterns */}
      <path d="M35 60 L65 60" strokeWidth="1" />
      <path d="M37 80 L63 80" strokeWidth="1" />
      <path d="M40 100 L60 100" strokeWidth="1" />
      <path d="M42 120 L58 120" strokeWidth="1" />
      {/* Diamond shapes */}
      <path d="M45 70 L50 65 L55 70 L50 75 Z" strokeWidth="1" />
      <path d="M45 90 L50 85 L55 90 L50 95 Z" strokeWidth="1" />
    </svg>
  ),
};

const BottleDesign: React.FC<BottleDesignProps> = ({ id, className }) => {
  const Design = designs[id] || designs["1"];
  return <Design className={className} />;
};

export default BottleDesign;
