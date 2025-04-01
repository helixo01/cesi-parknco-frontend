import React from "react";
import Image from "next/image";
import { AiOutlineArrowLeft, AiOutlineEdit } from "react-icons/ai";
import { useRouter } from "next/router";
import { colors } from "@/styles/colors";

interface EditableProfilPicProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  shape?: "circle" | "square";
  className?: string;
  withHeader?: boolean;
  onEditClick?: () => void;
}

export const EditableProfilPic: React.FC<EditableProfilPicProps> = ({
  src = "/pp.webp",
  alt = "Photo de profil",
  width = 175,
  height = 175,
  shape = "circle",
  className = "",
  withHeader = false,
  onEditClick,
}) => {
  const router = useRouter();
  const shapeClass = shape === "circle" ? "rounded-full" : "rounded-lg";

  const ImageWithEditButton = () => (
    <div className={`relative ${shapeClass} overflow-hidden ${className} group`}>
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
      <div 
        className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200"
      />
      <button
        onClick={onEditClick}
        className="absolute bottom-0 right-0 p-2 rounded-full bg-white shadow-lg opacity-70 group-hover:opacity-100 transition-all duration-200 hover:opacity-100"
        style={{ 
          transform: "translate(-8px, -8px)"
        }}
      >
        <AiOutlineEdit 
          size={24} 
          className="text-gray-800"
        />
      </button>
    </div>
  );

  if (withHeader) {
    return (
      <div className="w-full flex items-center justify-between px-4 py-2">
        <button 
          onClick={() => router.back()}
          className="flex items-center justify-center"
        >
          <AiOutlineArrowLeft size={32} color={colors.components.header.arrow} />
        </button>
        
        <ImageWithEditButton />
        
        <div className="w-8" /> {/* Placeholder pour maintenir l'espacement */}
      </div>
    );
  }

  return <ImageWithEditButton />;
}; 