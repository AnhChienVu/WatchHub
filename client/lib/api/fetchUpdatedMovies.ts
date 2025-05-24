export const fetchUpdatedMovies = async (page: number) => {
  const res = await fetch(
    `https://phimapi.com/danh-sach/phim-moi-cap-nhat?page=${page}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch Updated Movies");
  }
  const data = await res.json();
  console.log("Fetched Updated Movies: ", data);
  return data;
};
// https://phimapi.com/danh-sach/phim-moi-cap-nhat?page=1
