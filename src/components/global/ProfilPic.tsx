import React, { useRef } from "react";
import Image from "next/image";
import { AiOutlineCamera } from "react-icons/ai";
import { colors } from "@/styles/colors";
import { RxAvatar } from "react-icons/rx";
import { API_URL } from "@/config/api";

interface ProfilPicProps {
  src?: string | null;
  alt?: string;
  width?: number;
  height?: number;
  shape?: "circle" | "square";
  className?: string;
  onImageChange?: (file: File) => void;
  editable?: boolean;
}

export const ProfilPic: React.FC<ProfilPicProps> = ({
  src = null,
  alt = "Photo de profil",
  width = 175,
  height = 175,
  shape = "circle",
  className = "",
  onImageChange,
  editable = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const shapeClass = shape === "circle" ? "rounded-full" : "rounded-lg";

  const handleImageClick = () => {
    if (editable && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onImageChange) {
      onImageChange(file);
    }
  };

  // Convertir l'URL relative en URL complète si nécessaire
  const imageUrl = src?.startsWith('http') ? src : src ? `${API_URL}${src}` : null;

  return (
    <div 
      className={`relative ${shapeClass} overflow-hidden ${className} ${editable ? 'cursor-pointer group' : ''}`}
      onClick={handleImageClick}
      style={{ 
        backgroundColor: colors.background.default,
        width: width,
        height: height,
        position: 'relative'
      }}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority
          onError={(e) => {
            console.error('Erreur de chargement de l\'image:', imageUrl);
            const target = e.target as HTMLImageElement;
            target.src = "/pp.webp";
          }}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <RxAvatar 
            size={width * 0.85} 
            className="text-white stroke-[0.05]" 
          />
        </div>
      )}
      {editable && (
        <>
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <AiOutlineCamera size={32} color={colors.text.white} />
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </>
      )}
    </div>
  );
};