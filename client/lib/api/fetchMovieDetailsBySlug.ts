export const fetchMovieDetailsBySlug = async (movie: any) => {
  const slug = movie?.movieSlug || movie?.slug;
  console.log("Fetching Movie Details for slug: ", slug);
  const res = await fetch(`https://phimapi.com/phim/${slug}`);
  if (!res.ok) {
    throw new Error("Failed to fetch Movie Details");
  }
  const data = await res.json();
  console.log("Fetched Movie Details: ", data);
  return data;
};
