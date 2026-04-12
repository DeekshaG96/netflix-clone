import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Play, Plus, Check, Volume2, Star, Calendar, Clock, Sparkles, Newspaper, Info } from "lucide-react";
import { Movie } from "@/src/types";
import axios, { getImageUrl, requests, hasApiKey } from "@/src/services/tmdbService";
import { useAuth } from "@/src/context/AuthContext";
import { doc, setDoc, deleteDoc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db } from "@/src/lib/firebase";
import Recommendations from "./Recommendations";
import { useTheme } from "@/src/context/ThemeContext";
import { cn } from "@/src/lib/utils";
import { getShowInsights, ShowInsight } from "@/src/services/aiService";

interface VideoPlayerProps {
  movie: Movie | null;
  onClose: () => void;
  onMovieSelect: (movie: Movie) => void;
}

export default function VideoPlayer({ movie, onClose, onMovieSelect }: VideoPlayerProps) {
  const [isAdded, setIsAdded] = useState(false);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [details, setDetails] = useState<any>(null);
  const [aiInsights, setAiInsights] = useState<ShowInsight | null>(null);
  const [loadingInsights, setLoadingInsights] = useState(false);
  const { user } = useAuth();
  const { theme } = useTheme();

  useEffect(() => {
    if (!movie) return;

    async function fetchDetails() {
      try {
        const response = await axios.get(requests.fetchShowDetails(movie!.id));
        setDetails(response.data);
        setTrailerKey("dQw4w9WgXcQ"); 
      } catch (error) {
        console.error("Error fetching show details:", error);
      }
    }

    async function fetchAIInsights() {
      setLoadingInsights(true);
      setAiInsights(null);
      const insights = await getShowInsights(movie!.title || movie!.name || "");
      setAiInsights(insights);
      setLoadingInsights(false);
    }

    fetchDetails();
    fetchAIInsights();
    setIsPlaying(false);
  }, [movie]);

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

  if (!movie) return null;

  const cast = details?._embedded?.cast?.slice(0, 5).map((c: any) => c.person.name).join(", ") || "Loading...";
  const genres = details?.genres?.join(", ") || (movie as any).genres?.join(", ") || "N/A";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto pt-10 pb-10 px-4 md:px-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className={cn(
            "relative w-full max-w-4xl rounded-lg shadow-2xl z-10 overflow-hidden transition-colors duration-300",
            theme === 'dark' ? "bg-[#181818] text-white" : "bg-white text-black"
          )}
        >
          <button 
            onClick={onClose}
            className={cn(
              "absolute right-4 top-4 z-30 p-2 rounded-full transition-colors",
              theme === 'dark' ? "bg-[#181818] text-white hover:bg-white/10" : "bg-white text-black hover:bg-black/10 shadow-md"
            )}
          >
            <X size={24} />
          </button>

          {/* Video Section */}
          <div className="relative aspect-video w-full bg-black">
            {isPlaying && trailerKey ? (
              <iframe
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=0&controls=0&modestbranding=1&rel=0`}
                title="Movie Trailer"
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            ) : (
              <>
                <img 
                  src={getImageUrl(movie.backdrop_path)} 
                  alt={movie.title || movie.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-t via-transparent to-transparent",
                  theme === 'dark' ? "from-[#181818]" : "from-white"
                )} />
                
                <div className="absolute bottom-8 left-8 right-8">
                  <h2 className={cn(
                    "text-3xl md:text-5xl font-bold mb-6 drop-shadow-lg",
                    theme === 'dark' ? "text-white" : "text-black"
                  )}>
                    {movie.title || movie.name}
                  </h2>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setIsPlaying(true)}
                      className={cn(
                        "flex items-center gap-2 px-8 py-2 rounded font-bold transition-colors",
                        theme === 'dark' ? "bg-white text-black hover:bg-white/80" : "bg-black text-white hover:bg-black/80"
                      )}
                    >
                      <Play fill={theme === 'dark' ? "black" : "white"} size={24} /> Play
                    </button>
                    <button 
                      onClick={toggleMyList}
                      className={cn(
                        "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors",
                        theme === 'dark' ? "border-gray-400 text-white hover:border-white" : "border-gray-600 text-black hover:border-black"
                      )}
                    >
                      {isAdded ? <Check size={20} /> : <Plus size={20} />}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Info Section */}
          <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-1 text-green-500 font-bold">
                  <Star size={16} fill="currentColor" />
                  <span>{movie.vote_average * 10}% Match</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                  <Calendar size={16} />
                  <span>{details?.premiered?.split('-')[0] || '2024'}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                  <Clock size={16} />
                  <span>{details?.runtime || '60'}m</span>
                </div>
                <span className="text-xs border border-gray-400 px-1 rounded text-gray-500 font-bold">HD</span>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Overview</h3>
                <p className={cn(
                  "text-lg leading-relaxed",
                  theme === 'dark' ? "text-gray-300" : "text-gray-700"
                )}>
                  {movie.overview}
                </p>
              </div>

              {/* AI Real-Time Insights Section */}
              <div className={cn(
                "mt-8 p-6 rounded-xl border transition-all duration-300",
                theme === 'dark' 
                  ? "bg-white/5 border-white/10 shadow-2xl" 
                  : "bg-black/5 border-black/10 shadow-lg"
              )}>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="text-yellow-500 animate-pulse" size={20} />
                  <h4 className={cn(
                    "text-lg font-bold",
                    theme === 'dark' ? "text-white" : "text-black"
                  )}>AI Real-Time Insights</h4>
                </div>

                {loadingInsights ? (
                  <div className="space-y-4 animate-pulse">
                    <div className="h-4 bg-gray-500/20 rounded w-3/4" />
                    <div className="h-4 bg-gray-500/20 rounded w-1/2" />
                    <div className="h-20 bg-gray-500/20 rounded w-full" />
                  </div>
                ) : aiInsights ? (
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2 text-red-500">
                        <Newspaper size={16} />
                        <span className="text-xs font-bold uppercase tracking-wider">Latest News</span>
                      </div>
                      <p className={cn(
                        "text-sm",
                        theme === 'dark' ? "text-gray-300" : "text-gray-700"
                      )}>{aiInsights.latestNews}</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2 text-blue-500">
                        <Star size={16} />
                        <span className="text-xs font-bold uppercase tracking-wider">Critic Consensus</span>
                      </div>
                      <p className={cn(
                        "text-sm italic",
                        theme === 'dark' ? "text-gray-400" : "text-gray-600"
                      )}>"{aiInsights.criticConsensus}"</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className={cn(
                        "p-3 rounded-lg",
                        theme === 'dark' ? "bg-white/5" : "bg-black/5"
                      )}>
                        <div className="flex items-center gap-2 mb-2 text-green-500">
                          <Info size={16} />
                          <span className="text-xs font-bold uppercase tracking-wider">Real-Time Facts</span>
                        </div>
                        <ul className="space-y-1">
                          {aiInsights.realTimeFacts.map((fact, i) => (
                            <li key={i} className={cn(
                              "text-xs list-disc list-inside",
                              theme === 'dark' ? "text-gray-400" : "text-gray-600"
                            )}>
                              {fact}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className={cn(
                        "p-3 rounded-lg border border-yellow-500/30",
                        theme === 'dark' ? "bg-yellow-500/5" : "bg-yellow-500/10"
                      )}>
                        <div className="flex items-center gap-2 mb-2 text-yellow-500">
                          <Sparkles size={16} />
                          <span className="text-xs font-bold uppercase tracking-wider">Why Watch Now?</span>
                        </div>
                        <p className={cn(
                          "text-xs font-medium",
                          theme === 'dark' ? "text-gray-300" : "text-gray-700"
                        )}>{aiInsights.whyWatchNow}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic">Unable to fetch real-time AI insights at this moment.</p>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-2">Cast</h4>
                <p className={cn(
                  "text-sm leading-relaxed",
                  theme === 'dark' ? "text-gray-300" : "text-gray-800"
                )}>{cast}</p>
              </div>
              <div>
                <h4 className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-2">Genres</h4>
                <p className={cn(
                  "text-sm leading-relaxed",
                  theme === 'dark' ? "text-gray-300" : "text-gray-800"
                )}>{genres}</p>
              </div>
              <div>
                <h4 className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-2">Status</h4>
                <p className={cn(
                  "text-sm leading-relaxed",
                  theme === 'dark' ? "text-gray-300" : "text-gray-800"
                )}>{details?.status || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Recommendations Section */}
          <Recommendations movieId={movie.id} onMovieClick={onMovieSelect} />
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
