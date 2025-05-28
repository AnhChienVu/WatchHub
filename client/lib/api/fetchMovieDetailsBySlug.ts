export const fetchMovieDetailsBySlug = async (movie: any) => {
  console.log("Fetching Movie Details for slug: ", movie?.movieSlug);
  const res = await fetch(`https://phimapi.com/phim/${movie?.movieSlug}`);
  if (!res.ok) {
    throw new Error("Failed to fetch Movie Details");
  }
  const data = await res.json();
  console.log("Fetched Movie Details: ", data);
  return data;
};
