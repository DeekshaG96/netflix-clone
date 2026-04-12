import { motion, AnimatePresence } from "motion/react";
import { X, Play, Plus, ThumbsUp, Volume2 } from "lucide-react";
import { Movie } from "@/src/types";
import { getImageUrl } from "@/src/services/movieService";

interface MovieModalProps {
  movie: Movie | null;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  if (!movie) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-4xl bg-[#181818] rounded-xl overflow-hidden shadow-2xl z-10"
        >
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 z-20 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
          >
            <X size={24} className="text-white" />
          </button>

          <div className="relative aspect-video">
            <img 
              src={getImageUrl(movie.backdrop_path)} 
              alt={movie.title || movie.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent" />
            
            <div className="absolute bottom-8 left-8 right-8">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                {movie.title || movie.name}
              </h2>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 bg-white text-black px-8 py-2 rounded font-bold hover:bg-white/80 transition-colors">
                  <Play fill="black" size={24} /> Play
                </button>
                <button className="p-2 border-2 border-gray-500 rounded-full hover:border-white transition-colors">
                  <Plus size={24} />
                </button>
                <button className="p-2 border-2 border-gray-500 rounded-full hover:border-white transition-colors">
                  <ThumbsUp size={24} />
                </button>
                <div className="ml-auto">
                  <button className="p-2 border-2 border-gray-500 rounded-full hover:border-white transition-colors">
                    <Volume2 size={24} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4 text-sm font-semibold">
                <span className="text-green-500">{(movie.vote_average * 10).toFixed(0)}% Match</span>
                <span className="text-gray-400">{movie.release_date?.split("-")[0] || movie.first_air_date?.split("-")[0]}</span>
                <span className="border border-gray-500 px-1 text-[10px] rounded">HD</span>
              </div>
              <p className="text-lg leading-relaxed text-gray-200">
                {movie.overview}
              </p>
            </div>
            
            <div className="text-sm flex flex-col gap-4">
              <div>
                <span className="text-gray-500">Cast: </span>
                <span className="text-gray-200">Tom Cruise, Miles Teller, Jennifer Connelly</span>
              </div>
              <div>
                <span className="text-gray-500">Genres: </span>
                <span className="text-gray-200">Action, Adventure, Drama</span>
              </div>
              <div>
                <span className="text-gray-500">This movie is: </span>
                <span className="text-gray-200">Exciting, Emotional, Gritty</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
