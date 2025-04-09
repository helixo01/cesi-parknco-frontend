import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

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
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex">
      {[...Array(maxRating)].map((_, index) => {
        if (index < fullStars) {
          return (
            <AiFillStar
              key={index}
              className={`${className} inline-block transform hover:scale-110 transition-transform`}
              size={28}
            />
          );
        } else if (index === fullStars && hasHalfStar) {
          return (
            <AiFillStar
              key={index}
              className={`${className} inline-block transform hover:scale-110 transition-transform`}
              size={28}
              style={{ clipPath: 'inset(0 50% 0 0)' }}
            />
          );
        } else {
          return (
            <AiOutlineStar
              key={index}
              className={`${className} inline-block transform hover:scale-110 transition-transform`}
              size={28}
            />
          );
        }
      })}
    </div>
  );
};

export default Star; 