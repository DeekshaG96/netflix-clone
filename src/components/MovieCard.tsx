import React from "react";
import { motion } from "motion/react";
import { Movie } from "@/src/types";
import { getImageUrl } from "@/src/services/tmdbService";
import { cn } from "@/src/lib/utils";

import { useTheme } from "@/src/context/ThemeContext";

interface MovieCardProps {
  movie: Movie;
  isLarge?: boolean;
  showRank?: boolean;
  rank?: number;
  onClick: (movie: Movie) => void;
  className?: string;
  children?: React.ReactNode;
}

export const MovieCard: React.FC<MovieCardProps> = ({ 
  movie, 
  isLarge, 
  showRank, 
  rank, 
  onClick,
  className,
  children
}) => {
  const { theme } = useTheme();

  return (
    <motion.div
      whileHover={{ 
        scale: 1.05,
        zIndex: 50,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      onClick={() => onClick(movie)}
      className={cn(
        "relative flex-shrink-0 cursor-pointer transition-all duration-300 rounded-sm overflow-hidden",
        theme === 'dark' ? "bg-[#181818]" : "bg-white shadow-md",
        isLarge ? "w-[160px] md:w-[200px]" : "w-[200px] md:w-[280px]",
        className
      )}
    >
      {showRank && rank !== undefined && (
        <div className="absolute -left-4 bottom-0 z-10 pointer-events-none">
          <span 
            className={cn(
              "text-8xl md:text-9xl font-black stroke-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] opacity-80",
              theme === 'dark' ? "text-black stroke-white" : "text-white stroke-black"
            )}
            style={{ WebkitTextStroke: theme === 'dark' ? '2px white' : '2px black' }}
          >
            {rank}
          </span>
        </div>
      )}
      
      <div className={cn("relative", isLarge ? "aspect-[2/3]" : "aspect-video")}>
        <img
          src={getImageUrl(isLarge ? movie.poster_path : movie.backdrop_path)}
          alt={movie.name || movie.title}
          className={cn(
            "w-full h-full object-cover shadow-lg transition-shadow duration-300 hover:shadow-2xl",
            showRank && "ml-8"
          )}
          referrerPolicy="no-referrer"
        />
        
        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-end p-2">
          {!children && (
            <div className="w-full">
              <p className="text-white text-xs font-bold truncate">
                {movie.title || movie.name}
              </p>
              {(movie as any).views && (
                <p className="text-[10px] text-green-400 font-bold">
                  {(movie as any).views} views
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      
      {children && (
        <div className={cn(
          "p-4",
          theme === 'dark' ? "text-gray-300" : "text-gray-700"
        )}>
          {children}
        </div>
      )}
    </motion.div>
  );
};

export default MovieCard;
