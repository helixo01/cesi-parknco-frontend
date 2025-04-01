import React from "react";
import Image from "next/image";

interface ProfilPicProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  shape?: "circle" | "square";
  className?: string;
}

export const ProfilPic: React.FC<ProfilPicProps> = ({
  src = "/pp.webp",
  alt = "Photo de profil",
  width = 175,
  height = 175,
  shape = "circle",
  className = "",
}) => {
  const shapeClass = shape === "circle" ? "rounded-full" : "rounded-lg";

  return (
    <div className={`relative ${shapeClass} overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = "/pp.webp";
        }}
      />
    </div>
  );
}; 