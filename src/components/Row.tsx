import { useState, useEffect } from "react";
import { Movie } from "@/src/types";
import axios, { hasApiKey, mockMovies, handleTVMazeResponse } from "@/src/services/tmdbService";
import MovieCard from "./MovieCard";
import { useTheme } from "@/src/context/ThemeContext";
import { cn } from "@/src/lib/utils";

interface RowProps {
  title: string;
  fetchUrl?: string;
  movies?: Movie[];
  isLargeRow?: boolean;
  showRank?: boolean;
  onMovieClick: (movie: Movie) => void;
}

export default function Row({ title, fetchUrl, movies: initialMovies, isLargeRow, showRank, onMovieClick }: RowProps) {
  const [movies, setMovies] = useState<Movie[]>(initialMovies || []);
  const [loading, setLoading] = useState(!initialMovies);
  const { theme } = useTheme();

  useEffect(() => {
    if (initialMovies) {
      setMovies(initialMovies);
      setLoading(false);
      return;
    }

    async function fetchData() {
      if (!fetchUrl) return;
      setLoading(true);
      
      try {
        const response = await axios.get(fetchUrl);
        setMovies(handleTVMazeResponse(response.data));
      } catch (error) {
        console.error(`Error fetching ${title}:`, error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [fetchUrl, title, initialMovies]);

  return (
    <div className="ml-8 mt-8">
      <h2 className={cn(
        "text-xl md:text-2xl font-bold mb-4",
        theme === 'dark' ? "text-white" : "text-black"
      )}>{title}</h2>
      
      <div className="flex overflow-x-scroll overflow-y-hidden p-5 scrollbar-hide gap-4 min-h-[200px]">
        {loading ? (
          Array(6).fill(0).map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "flex-shrink-0 animate-pulse rounded-sm",
                isLargeRow ? "w-[160px] md:w-[200px] h-[240px] md:h-[300px]" : "w-[200px] md:w-[280px] h-[112px] md:h-[157px]",
                theme === 'dark' ? "bg-white/5" : "bg-black/5"
              )} 
            />
          ))
        ) : (
          movies.map((movie, index) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isLarge={isLargeRow}
              showRank={showRank}
              rank={index + 1}
              onClick={onMovieClick}
            />
          ))
        )}
      </div>
    </div>
  );
}
