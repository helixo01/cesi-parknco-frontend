import React from "react";
import Image from "next/image";

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export const ImageComponent: React.FC<ImageProps> = ({ 
  src, 
  alt, 
  width = 500, 
  height = 300,
  className = "" 
}) => {
  return (
    <div className={`relative flex justify-center items-center ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="rounded-lg object-cover"
      />
    </div>
  );
}; 