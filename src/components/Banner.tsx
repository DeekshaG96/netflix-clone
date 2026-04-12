import { useState, useEffect } from "react";
import axios, { getImageUrl, requests, hasApiKey, mockMovies, handleTVMazeResponse } from "@/src/services/tmdbService";
import { Movie } from "@/src/types";
import { Play, Plus, Check } from "lucide-react";
import { motion } from "motion/react";
import { useAuth } from "@/src/context/AuthContext";
import { doc, setDoc, deleteDoc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db } from "@/src/lib/firebase";

export default function Banner() {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isAdded, setIsAdded] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(requests.fetchNetflixOriginals);
        const results = handleTVMazeResponse(response.data);
        if (results.length > 0) {
          const selected = results[Math.floor(Math.random() * results.length)];
          setMovie(selected);
        }
      } catch (error) {
        console.error("Error fetching banner movie:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!user || !movie) return;

    const unsubscribe = onSnapshot(
      doc(db, "users", user.uid, "myList", movie.id.toString()),
      (doc) => {
        setIsAdded(doc.exists());
      }
    );

    return () => unsubscribe();
  }, [user, movie]);

  const toggleMyList = async () => {
    if (!user || !movie) return;

    const docRef = doc(db, "users", user.uid, "myList", movie.id.toString());

    try {
      if (isAdded) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, {
          id: movie.id,
          title: movie.title || movie.name,
          poster_path: movie.poster_path,
          backdrop_path: movie.backdrop_path,
          overview: movie.overview,
          addedAt: serverTimestamp(),
        });
      }
    } catch (error) {
      console.error("Error updating My List:", error);
    }
  };

  function truncate(str: string, n: number) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  if (!movie) return (
    <div className="h-[448px] md:h-[80vh] bg-black flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <header
      className="relative h-[448px] md:h-[80vh] text-white object-contain"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("${getImageUrl(movie?.backdrop_path)}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
      
      <div className="relative z-10 ml-8 pt-36 h-[190px]">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl lg:text-6xl font-extrabold pb-1"
        >
          {movie?.title || movie?.name || movie?.original_name}
        </motion.h1>

        <div className="flex gap-4 mt-4">
          <button className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded font-bold hover:bg-white/80 transition-colors">
            <Play fill="black" size={24} /> Play
          </button>
          <button 
            onClick={toggleMyList}
            className="flex items-center gap-2 bg-gray-500/70 text-white px-6 py-2 rounded font-bold hover:bg-gray-500/50 transition-colors"
          >
            {isAdded ? <Check size={24} /> : <Plus size={24} />}
            My List
          </button>
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full md:max-w-[360px] lg:max-w-[500px] text-sm md:text-base pt-4 leading-relaxed"
        >
          {truncate(movie?.overview, 150)}
        </motion.p>
      </div>
    </header>
  );
}
