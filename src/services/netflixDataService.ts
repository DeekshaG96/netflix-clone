import { Movie } from "../types";

export interface EngagementMovie extends Movie {
  views: string;
  rank: number;
}

export const engagementReportH12024: EngagementMovie[] = [
  {
    id: 763215,
    title: "Damsel",
    views: "143.8M",
    rank: 1,
    backdrop_path: "/photo-1626814026160-2237a95fc5a0",
    poster_path: "/photo-1626814026160-2237a95fc5a0",
    overview: "A dutiful damsel agrees to marry a handsome prince, only to find the royal family has recruited her as a sacrifice to repay an ancient debt.",
    genre_ids: [14, 28, 12],
    vote_average: 7.5
  },
  {
    id: 823464,
    title: "Lift",
    views: "129.4M",
    rank: 2,
    backdrop_path: "/photo-1509248961158-e54f6934749c",
    poster_path: "/photo-1509248961158-e54f6934749c",
    overview: "An international heist crew, led by Cyrus Whitaker, race to lift $500 million in gold from a passenger plane at 40,000 feet.",
    genre_ids: [28, 35, 80],
    vote_average: 6.8
  },
  {
    id: 850165,
    title: "Society of the Snow",
    views: "103.8M",
    rank: 3,
    backdrop_path: "/photo-1535016120720-40c646bebbfc",
    poster_path: "/photo-1535016120720-40c646bebbfc",
    overview: "On October 13, 1972, Uruguayan Air Force Flight 571, chartered to take a rugby team to Chile, crashed into a glacier in the heart of the Andes.",
    genre_ids: [18, 36],
    vote_average: 8.2
  },
  {
    id: 1041613,
    title: "Under Paris",
    views: "84.7M",
    rank: 4,
    backdrop_path: "/photo-1485846234645-a62644f84728",
    poster_path: "/photo-1485846234645-a62644f84728",
    overview: "In the summer of 2024, Paris is hosting the World Triathlon Championships on the Seine for the first time. Sophia, a brilliant scientist, learns from Mika, a young environmental activist, that a large shark is swimming deep in the river.",
    genre_ids: [28, 27, 53],
    vote_average: 6.5
  },
  {
    id: 502356,
    title: "The Super Mario Bros. Movie",
    views: "80.3M",
    rank: 5,
    backdrop_path: "/photo-1517604931442-7e0c8ed2963c",
    poster_path: "/photo-1517604931442-7e0c8ed2963c",
    overview: "While working underground to fix a water main, Brooklyn plumbers—and brothers—Mario and Luigi are transported down a mysterious pipe and wander into a magical new world.",
    genre_ids: [16, 12, 10751, 14, 35],
    vote_average: 7.8
  }
];

export const topTVShowsH12024: EngagementMovie[] = [
  {
    id: 210733,
    title: "Fool Me Once",
    views: "107.5M",
    rank: 1,
    backdrop_path: "/photo-1478720568477-152d9b164e26",
    poster_path: "/photo-1478720568477-152d9b164e26",
    overview: "When ex-soldier Maya sees her killed husband on a secret nanny cam, she uncovers a deadly conspiracy that stretches deep into the past.",
    genre_ids: [80, 18, 9648],
    vote_average: 7.2
  },
  {
    id: 84352,
    title: "Bridgerton: Season 3",
    views: "91.9M",
    rank: 2,
    backdrop_path: "/photo-1536440136628-849c177e76a1",
    poster_path: "/photo-1536440136628-849c177e76a1",
    overview: "The eight close-knit siblings of the Bridgerton family look for love and happiness in London high society.",
    genre_ids: [18, 10749],
    vote_average: 8.4
  },
  {
    id: 247885,
    title: "Baby Reindeer",
    views: "87.6M",
    rank: 3,
    backdrop_path: "/photo-1594909122845-11baa439b7bf",
    poster_path: "/photo-1594909122845-11baa439b7bf",
    overview: "When a struggling comedian shows a kind gesture to a vulnerable woman, it sparks a suffocating obsession which threatens to wreck both their lives.",
    genre_ids: [18],
    vote_average: 8.1
  }
];
