"use client";

import FilterBar from "@/components/FilterBar/FilterBar";
import MovieCard from "@/components/MovieCard/MovieCard";
import { fetchMoviesByCategory } from "@/lib/api/fetchMoviesByCategory";
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

const LIMIT = 64;

function MovieCategory() {
  const pathName = usePathname();
  const category_name: string = pathName.split("/")[2] || "";
  const subCategory_name: string = pathName.split("/")[3] || "";
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(subCategory_name);
  const [filters, setFilters] = useState({
    sortedField: "_id",
    sortedType: "desc",
    // sortedLang: "vietsub",
    category: category_name,
    // country: "viet-nam",
    // year: currentYear.toString(),
    limit: LIMIT,
    // page: PAGE,
    // sub_category: "hanh-dong",
  });
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const MOVIES_PER_PAGE = 20;

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const response = await fetchMoviesByCategory({ ...filters });
      if (response) {
        setMovies(response?.data?.items);
      }
      setLoading(false);
    };
    fetchData();
  }, [filters]);

  const filteredMovies = selectedCategory
    ? movies?.filter(
        (movie: any) =>
          Array.isArray(movie.category) &&
          movie.category.some((cat: any) => cat.slug === selectedCategory)
      )
    : movies;

  // Pagination logic
  const totalMovies = filteredMovies?.length;
  const totalPages = Math.ceil(totalMovies / MOVIES_PER_PAGE);
  const startIdx = (currentPage - 1) * MOVIES_PER_PAGE;
  const endIdx = startIdx + MOVIES_PER_PAGE;
  const moviesToShow = filteredMovies?.slice(startIdx, endIdx);
  console.log("Movies to show:", movies);
  return (
    <div className="pt-20">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">New Movie Series</h1>
        <p className="text-gray-300 text-lg">
          A collection of the best TV series, continuously updated.
        </p>
      </div>

      {/* Filter Bar */}
      <FilterBar
        currentFilters={filters}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Movie Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {loading ? (
          // Show skeletons while loading
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
            <div
              key={index}
              className="bg-slate-500 animate-pulse h-60 rounded"
            ></div>
          ))
        ) : filteredMovies?.length !== 0 ? (
          moviesToShow?.length !== 0 ? (
            moviesToShow?.map((movie: any, _id) => {
              const posterUrl = movie.poster_url.startsWith("http")
                ? movie.poster_url
                : "https://phimimg.com/" + movie.poster_url;
              movie.poster_url = posterUrl;

              return (
                <MovieCard key={_id} index={_id} movie={movie} length={LIMIT} />
              );
            })
          ) : (
            <div className="col-span-full text-center text-gray-400 py-12 text-lg">
              There is nothing to show.
            </div>
          )
        ) : (
          <div className="col-span-full text-center text-gray-400 py-12 text-lg">
            There is nothing to show.
          </div>
        )}
      </div>

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
                  currentPage === totalPages || currentPage === 1
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

export default MovieCategory;
