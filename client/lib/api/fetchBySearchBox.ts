export const fetchBySearchBox = async (keyword: string) => {
  const res = await fetch(
    `https://phimapi.com/v1/api/tim-kiem?keyword=${keyword}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch Movies By Search Box");
  }
  const data = await res.json();
  console.log("Fetched Movies By Search Box: ", data);
  return data;
};
//  https://phimapi.com/v1/api/tim-kiem?keyword=Thước&page=1&sort_field=_id&sort_type=asc&sort_lang=long-tieng&category=hanh-dong&country=trung-quoc&year=2024&limit=10
