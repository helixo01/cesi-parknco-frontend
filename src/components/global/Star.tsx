import React from 'react';

interface StarProps {
  rating: number;
  maxRating?: number;
  className?: string;
}

export const Star: React.FC<StarProps> = ({ 
  rating, 
  maxRating = 5,
  className = "text-yellow-400"
}) => {
  return (
    <div className="flex">
      {[...Array(maxRating)].map((_, index) => (
        <span 
          key={index} 
          className={className}
          aria-label={`${rating} sur ${maxRating} étoiles`}
        >
          {index < rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
};

export default Star; 