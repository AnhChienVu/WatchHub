export interface Movie {
  _id: string;
  name: string;
  slug: string;
  poster_url: string;
  year: number;
  quality: string;
  lang: string;
  time: string;
  category: Array<{ name: string }>;
}

export interface ApiResponse {
  status: boolean;
  items: Movie[];
  pagination: {
    currentPage: number;
    totalPages: number;
  };
}

export interface MovieDetailsResponse {
  status: boolean;
  msg: string;
  movie: {
    _id: string;
    name: string;
    origin_name: string;
    content: string;
    type: string;
    status: string;
    poster_url: string;
    thumb_url: string;
    is_copyright: boolean;
    sub_docquyen: boolean;
    chieurap: boolean;
    trailer_url: string;
    time: string;
    episode_current: string;
    episode_total: string;
    quality: string;
    lang: string;
    notify: string;
    showtimes: string;
    slug: string;
    year: number;
    // ... other fields
  };
  episodes: Array<{
    server_name: string;
    server_data: Array<{
      name: string;
      slug: string;
      filename: string;
      link_embed: string;
      link_m3u8: string;
    }>;
  }>;
}
