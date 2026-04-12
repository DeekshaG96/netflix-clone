export interface Movie {
  id: number;
  title?: string;
  name?: string;
  original_name?: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  first_air_date?: string;
  release_date?: string;
  vote_average: number;
  genre_ids: number[];
  genres?: string[];
}

export interface Genre {
  id: number;
  name: string;
}
