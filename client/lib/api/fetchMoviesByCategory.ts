export async function fetchMoviesByCategory(params: {
  page?: number;
  category: string;
  country?: string;
  year?: string;
  sortedField?: string;
  sortedType?: string;
  sortedLang?: string;
  limit?: number;
  sub_category?: string;
}) {
  const url = new URL(
    `https://phimapi.com/v1/api/danh-sach/${params?.category}`
  );
  if (params.page) {
    url.searchParams.append("page", params.page.toString());
  }
  if (params.sortedField)
    url.searchParams.append("sort_field", params.sortedField);
  if (params.sortedType)
    url.searchParams.append("sort_type", params.sortedType);
  if (params.sortedLang)
    url.searchParams.append("sort_type", params.sortedLang);
  if (params.sub_category)
    url.searchParams.append("sort_type", params.sub_category);
  if (params.country) url.searchParams.append("country", params.country);
  if (params.year) url.searchParams.append("year", params.year);
  url.searchParams.append(
    "limit",
    params.limit ? params.limit.toString() : "24"
  );
  const res = await fetch(url.toString());
  return res.json();
}
