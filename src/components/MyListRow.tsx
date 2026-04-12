import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/src/lib/firebase";
import { useAuth } from "@/src/context/AuthContext";
import { Movie } from "@/src/types";
import MovieCard from "./MovieCard";
import { useTheme } from "@/src/context/ThemeContext";
import { cn } from "@/src/lib/utils";

interface MyListRowProps {
  onMovieClick: (movie: Movie) => void;
}

export default function MyListRow({ onMovieClick }: MyListRowProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const { user } = useAuth();
  const { theme } = useTheme();

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "users", user.uid, "myList"),
      orderBy("addedAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const moviesData = snapshot.docs.map((doc) => doc.data() as Movie);
      setMovies(moviesData);
    });

    return () => unsubscribe();
  }, [user]);

  if (movies.length === 0) return null;

  return (
    <div className="ml-8 mt-8">
      <h2 className={cn(
        "text-xl md:text-2xl font-bold mb-4",
        theme === 'dark' ? "text-white" : "text-black"
      )}>My List</h2>
      
      <div className="flex overflow-x-scroll overflow-y-hidden p-5 scrollbar-hide gap-4">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={onMovieClick}
          />
        ))}
      </div>
    </div>
  );
}
