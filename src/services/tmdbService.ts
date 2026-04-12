import axios from "axios";

const BASE_URL = "https://api.tvmaze.com";

export const hasApiKey = true; // TVmaze doesn't need a key

export const mockMovies = []; // Not needed anymore as we have live data

export const mockGenres = [
  { id: 1, name: "Drama" },
  { id: 2, name: "Science-Fiction" },
  { id: 3, name: "Thriller" },
  { id: 4, name: "Action" },
  { id: 5, name: "Comedy" },
  { id: 6, name: "Horror" }
];

export const getImageUrl = (path: string | null) => {
  if (!path) return "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=2070&auto=format&fit=crop";
  return path;
};

// Helper to map TVmaze show to our Movie type
export const mapTVShowToMovie = (show: any) => ({
  id: show.id,
  title: show.name,
  name: show.name,
  poster_path: show.image?.medium || show.image?.original || "",
  backdrop_path: show.image?.original || show.image?.medium || "",
  overview: show.summary?.replace(/<[^>]*>?/gm, "") || "No description available.",
  vote_average: show.rating?.average || 0,
  genre_ids: [], // TVmaze uses string genres, we'll handle this in the UI
  genres: show.genres || [],
  status: show.status,
  premiered: show.premiered,
  runtime: show.runtime,
  officialSite: show.officialSite
});

export const handleTVMazeResponse = (data: any) => {
  if (Array.isArray(data)) {
    if (data.length > 0 && data[0].show) {
      // Search results
      return data.map((item: any) => mapTVShowToMovie(item.show));
    }
    // List results
    return data.map((show: any) => mapTVShowToMovie(show));
  }
  return [];
};

export const requests = {
  fetchTrending: `/shows?page=1`,
  fetchNetflixOriginals: `/search/shows?q=netflix`,
  fetchTopRated: `/shows?page=2`,
  fetchActionMovies: `/search/shows?q=action`,
  fetchComedyMovies: `/search/shows?q=comedy`,
  fetchHorrorMovies: `/search/shows?q=horror`,
  fetchRomanceMovies: `/search/shows?q=romance`,
  fetchDocumentaries: `/search/shows?q=documentary`,
  fetchGenres: `/genres`, // Not directly supported, but we'll mock or handle
  fetchMoviesByGenre: (genre: string) => `/search/shows?q=${genre}`,
  searchMovies: (query: string) => `/search/shows?q=${query}`,
  fetchRecommendations: (showId: number) => `/shows/${showId}/related`, // Not directly supported
  fetchVideos: (showId: number) => `/shows/${showId}/videos`, // Not directly supported
  fetchShowDetails: (showId: number) => `/shows/${showId}?embed=cast`,
  fetchSchedule: () => `/schedule`
};

const instance = axios.create({
  baseURL: BASE_URL,
});

export default instance;
