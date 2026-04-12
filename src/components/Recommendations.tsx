import { useState, useEffect } from "react";
import axios, { requests, hasApiKey, mockMovies, handleTVMazeResponse } from "@/src/services/tmdbService";
import { Movie } from "@/src/types";
import MovieCard from "./MovieCard";
import { useTheme } from "@/src/context/ThemeContext";
import { cn } from "@/src/lib/utils";

interface RecommendationsProps {
  movieId: number;
  onMovieClick: (movie: Movie) => void;
}

export default function Recommendations({ movieId, onMovieClick }: RecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const { theme } = useTheme();

  useEffect(() => {
    async function fetchRecs() {
      try {
        // TVmaze doesn't have a direct "related" endpoint that works by ID easily without extra logic,
        // so we'll fetch some popular shows as recommendations for the demo.
        const response = await axios.get(requests.fetchTrending);
        const results = handleTVMazeResponse(response.data);
        setRecommendations(results.slice(0, 6));
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    }
    fetchRecs();
  }, [movieId]);

  if (recommendations.length === 0) return null;

  return (
    <div className="mt-12 px-4 md:px-12 pb-12">
      <h3 className={cn(
        "text-2xl font-bold mb-6",
        theme === 'dark' ? "text-white" : "text-black"
      )}>More Like This</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {recommendations.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={onMovieClick}
            className="w-full"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-green-500 font-semibold text-sm">{movie.vote_average * 10}% Match</span>
                <span className="text-gray-400 text-xs border border-gray-600 px-1">HD</span>
              </div>
              <p className={cn(
                "text-xs line-clamp-3",
                theme === 'dark' ? "text-gray-300" : "text-gray-600"
              )}>
                {movie.overview || "No description available."}
              </p>
            </div>
          </MovieCard>
        ))}
      </div>
    </div>
  );
}
