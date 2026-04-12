import axios from "axios";
import { GoogleGenAI } from "@google/genai";

const TVMAZE_BASE_URL = "https://api.tvmaze.com";

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const getImageUrl = (image: any) => {
  if (!image) return "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=2070&auto=format&fit=crop";
  return typeof image === 'string' ? image : (image.original || image.medium);
};

export const fetchShows = async (query: string) => {
  try {
    const response = await axios.get(`${TVMAZE_BASE_URL}/search/shows?q=${query}`);
    return response.data.map((item: any) => ({
      id: item.show.id,
      title: item.show.name,
      name: item.show.name,
      overview: item.show.summary?.replace(/<[^>]*>?/gm, '') || "No description available.",
      backdrop_path: item.show.image?.original || item.show.image?.medium,
      poster_path: item.show.image?.medium || item.show.image?.original,
      vote_average: item.show.rating?.average || 0,
      release_date: item.show.premiered,
      first_air_date: item.show.premiered,
      genres: item.show.genres || [],
    }));
  } catch (error) {
    console.error("Error fetching from TVMaze:", error);
    return [];
  }
};

export const getAiRecommendation = async (prompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a Netflix recommendation engine. Based on the mood "${prompt}", suggest 5 real TV shows or movies. Return ONLY a JSON array of objects with "title" and "reason" fields.`,
      config: {
        responseMimeType: "application/json",
      }
    });
    
    const recommendations = JSON.parse(response.text);
    
    // Fetch details for each recommendation from TVMaze
    const detailedRecs = await Promise.all(
      recommendations.map(async (rec: any) => {
        const shows = await fetchShows(rec.title);
        if (shows.length > 0) {
          return { ...shows[0], aiReason: rec.reason };
        }
        return null;
      })
    );
    
    return detailedRecs.filter(Boolean);
  } catch (error) {
    console.error("Gemini error:", error);
    return [];
  }
};

export const requests = {
  fetchTrending: "trending",
  fetchNetflixOriginals: "netflix",
  fetchTopRated: "top",
  fetchActionMovies: "action",
  fetchComedyMovies: "comedy",
  fetchHorrorMovies: "horror",
  fetchRomanceMovies: "romance",
  fetchDocumentaries: "documentary",
};

export default axios.create({
  baseURL: TVMAZE_BASE_URL,
});
