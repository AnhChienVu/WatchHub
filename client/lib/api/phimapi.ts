export const fetchMovies = async (path: string) => {
  const res = await fetch(`https://phimapi.com${path}`);
  if (!res.ok) {
    throw new Error("Failed to fetch Movies");
  }
  const data = await res.json();
  console.log("Fetched Movies: ", data);
  return data;
};
