import { useState, useEffect } from "react";
import Navbar from "@/src/components/Navbar";
import Banner from "@/src/components/Banner";
import Row from "@/src/components/Row";
import MyListRow from "@/src/components/MyListRow";
import VideoPlayer from "@/src/components/VideoPlayer";
import axios, { requests, getImageUrl, hasApiKey, mockGenres, mockMovies, handleTVMazeResponse } from "@/src/services/tmdbService";
import { engagementReportH12024, topTVShowsH12024 } from "@/src/services/netflixDataService";
import { Movie, Genre } from "@/src/types";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useTheme } from "@/src/context/ThemeContext";
import { cn } from "@/src/lib/utils";

export default function Browse() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setGenres(mockGenres);
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      try {
        const response = await axios.get(requests.searchMovies(searchQuery));
        setSearchResults(handleTVMazeResponse(response.data));
      } catch (error) {
        console.error("Search error:", error);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const filteredSearchResults = selectedGenre 
    ? searchResults.filter(movie => movie.genres?.includes(selectedGenre.name))
    : searchResults;

  return (
    <div className={cn(
      "min-h-screen pb-20 transition-colors duration-500",
      theme === 'dark' ? "bg-[#111]" : "bg-gray-50"
    )}>
      <Navbar onSearch={setSearchQuery} />
      
      <div className="pt-24 px-8 flex items-center gap-4 mb-8">
        <h2 className={cn(
          "text-2xl font-bold",
          theme === 'dark' ? "text-white" : "text-black"
        )}>
          {searchQuery ? "Search" : "Movies"}
        </h2>
        <div className="relative z-40">
          <button 
            onClick={() => setIsGenreOpen(!isGenreOpen)}
            className={cn(
              "flex items-center gap-2 border px-4 py-1 text-sm font-bold transition-colors",
              theme === 'dark' 
                ? "bg-black border-white/30 text-white hover:bg-white/10" 
                : "bg-white border-black/30 text-black hover:bg-black/5"
            )}
          >
            {selectedGenre ? selectedGenre.name : "Genres"}
            <ChevronDown size={16} />
          </button>
          
          {isGenreOpen && (
            <div className={cn(
              "absolute top-full left-0 mt-1 w-64 border grid grid-cols-2 p-4 gap-2 shadow-2xl backdrop-blur-md",
              theme === 'dark' ? "bg-black/90 border-white/20" : "bg-white/90 border-black/20"
            )}>
              <button 
                onClick={() => { setSelectedGenre(null); setIsGenreOpen(false); }}
                className={cn(
                  "text-left text-sm transition-colors",
                  theme === 'dark' ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"
                )}
              >
                All Genres
              </button>
              {genres.map((genre) => (
                <button
                  key={genre.id}
                  onClick={() => { setSelectedGenre(genre); setIsGenreOpen(false); }}
                  className={cn(
                    "text-left text-sm transition-colors truncate",
                    theme === 'dark' ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"
                  )}
                >
                  {genre.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {searchQuery ? (
        <div className="px-8">
          <h2 className="text-xl text-gray-400 mb-8">
            Results for "{searchQuery}" {selectedGenre && `in ${selectedGenre.name}`}
          </h2>
          {filteredSearchResults.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredSearchResults.map((movie) => (
                <motion.div
                  key={movie.id}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedMovie(movie)}
                  className="relative cursor-pointer aspect-video rounded-sm overflow-hidden shadow-md"
                >
                  <img
                    src={getImageUrl(movie.backdrop_path || movie.poster_path)}
                    alt={movie.title || movie.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-end p-2">
                    <p className="text-white text-sm font-bold truncate">{movie.title || movie.name}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-500">
              No results found matching your criteria.
            </div>
          )}
        </div>
      ) : (
        <>
          <Banner />
          <div className="relative z-20 mt-8">
            <MyListRow onMovieClick={setSelectedMovie} />
            
            {!selectedGenre && (
              <>
                <Row 
                  title="Live on TV Today" 
                  fetchUrl={requests.fetchSchedule()} 
                  onMovieClick={setSelectedMovie} 
                />
                <Row 
                  title="Most Watched Movies (H1 2024)" 
                  movies={engagementReportH12024} 
                  showRank
                  onMovieClick={setSelectedMovie} 
                />
                <Row 
                  title="Top TV Shows (H1 2024)" 
                  movies={topTVShowsH12024} 
                  showRank
                  onMovieClick={setSelectedMovie} 
                />
              </>
            )}

            {selectedGenre && (
              <Row 
                title={selectedGenre.name} 
                fetchUrl={requests.fetchMoviesByGenre(selectedGenre.name)} 
                isLargeRow 
                onMovieClick={setSelectedMovie}
              />
            )}
            <Row 
              title="NETFLIX ORIGINALS" 
              fetchUrl={requests.fetchNetflixOriginals} 
              isLargeRow={!selectedGenre}
              onMovieClick={setSelectedMovie}
            />
            <Row title="Trending Now" fetchUrl={requests.fetchTrending} onMovieClick={setSelectedMovie} />
            <Row title="Top Rated" fetchUrl={requests.fetchTopRated} onMovieClick={setSelectedMovie} />
            {!selectedGenre && (
              <>
                <Row title="Action Movies" fetchUrl={requests.fetchMoviesByGenre("Action")} onMovieClick={setSelectedMovie} />
                <Row title="Comedy Movies" fetchUrl={requests.fetchMoviesByGenre("Comedy")} onMovieClick={setSelectedMovie} />
                <Row title="Horror Movies" fetchUrl={requests.fetchMoviesByGenre("Horror")} onMovieClick={setSelectedMovie} />
                <Row title="Romance Movies" fetchUrl={requests.fetchMoviesByGenre("Romance")} onMovieClick={setSelectedMovie} />
                <Row title="Documentaries" fetchUrl={requests.fetchMoviesByGenre("Documentary")} onMovieClick={setSelectedMovie} />
              </>
            )}
          </div>
        </>
      )}

      <VideoPlayer 
        movie={selectedMovie} 
        onClose={() => setSelectedMovie(null)} 
        onMovieSelect={setSelectedMovie}
      />
    </div>
  );
}
