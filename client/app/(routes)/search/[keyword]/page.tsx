"use client";
import MovieCard from "@/components/MovieCard/MovieCard";
import { fetchBySearchBox } from "@/lib/api/fetchBySearchBox";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function SearchedByKeywordMovie() {
  const params = usePathname();
  const searchKeyword = params.split("/").pop();

  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const MOVIES_PER_PAGE = 20;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (searchKeyword?.trim()) {
      fetchResults(searchKeyword);
    }
  }, [searchKeyword]);

  async function fetchResults(searchQuery: string) {
    try {
      setIsLoading(true);
      setError("");

      const res = await fetchBySearchBox(searchQuery);

      if (res.status === "success") {
        setResults(res.data.items);
      } else {
        setError(res.msg || "No results found");
      }
    } catch (err) {
      setError("Failed to fetch results");
    } finally {
      setIsLoading(false);
    }
  }

  // Pagination logic
  const totalMovies = results?.length;
  const totalPages = Math.ceil(totalMovies / MOVIES_PER_PAGE);
  const startIdx = (currentPage - 1) * MOVIES_PER_PAGE;
  const endIdx = startIdx + MOVIES_PER_PAGE;
  const moviesToShow = results?.slice(startIdx, endIdx);

  console.log("totalPages: ", totalPages);
  console.log("currentPage: ", currentPage);

  return (
    <div className="pt-15">
      {/* Search Header */}
      <div className="mt-10 mb-8 max-w-3xl mx-auto">
        <h1 className="text-lg md:text-2xl lg:text-3xl xl:text-4xl font-bold text-center mb-2 md:mb-3 lg:mb-4 xl:mb-5">
          {searchKeyword ? `Results for "${searchKeyword}"` : "Search Movies"}
        </h1>
      </div>

      {/* Results Section */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-800 rounded-lg aspect-[2/3] animate-pulse"
            />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={() => fetchResults(searchKeyword ?? "")}
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      ) : results.length > 0 ? (
        <div className="px-10 md:px-15 lg:px-20 xl:px-50">
          <p className="text-sm md:text-lg lg:text-2xl xl:text-3xl text-gray-400 mb-2 xl:mb-6">
            Found {results.length} {results.length === 1 ? "result" : "results"}
          </p>

          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2 xl:gap-7">
            {moviesToShow.map((movie) => {
              const posterUrl = movie.poster_url.startsWith("http")
                ? movie.poster_url
                : "https://phimimg.com/" + movie.poster_url;
              movie.poster_url = posterUrl;

              return (
                <MovieCard
                  index={movie.id}
                  key={movie._id}
                  movie={movie}
                  length={10}
                  onRemoveFavorite={() => {}}
                />
              );
            })}
          </div>
        </div>
      ) : searchKeyword ? (
        <div className="text-center py-12">
          <p className="text-gray-400">No movies found matching your search</p>
          <p className="text-sm text-gray-500 mt-2">
            Try different keywords or check spelling
          </p>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400">Enter a movie name to start searching</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                className={`text-xl${
                  currentPage === 1 ? " pointer-events-none opacity-50" : ""
                }`}
                onClick={() => {
                  if (currentPage !== 1)
                    setCurrentPage((p) => Math.max(1, p - 1));
                }}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, idx) => (
              <PaginationItem key={idx}>
                <PaginationLink
                  href="#"
                  className={`text-xl ${
                    currentPage === idx + 1 ? "font-bold text-red-500" : ""
                  }`}
                  onClick={() => setCurrentPage(idx + 1)}
                >
                  {idx + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationEllipsis className="text-xl" />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#"
                className={`text-xl${
                  currentPage === totalPages
                    ? " pointer-events-none opacity-50"
                    : ""
                }`}
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}

export default SearchedByKeywordMovie;
