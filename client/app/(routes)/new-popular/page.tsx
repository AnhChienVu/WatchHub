"use client";

import FilterBar from "@/components/FilterBar/FilterBar";
import MovieCard from "@/components/MovieCard/MovieCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { fetchUpdatedMovies } from "@/lib/api/fetchUpdatedMovies";
import React, { useEffect, useState } from "react";

const LIMIT = 64;

function NewPopularMovies() {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    sortedField: "_id",
    sortedType: "desc",
    // sortedLang: "vietsub",
    category: "",
    // country: "viet-nam",
    // year: currentYear.toString(),
    limit: LIMIT,
    // page: PAGE,
    // sub_category: "hanh-dong",
  });
  const [movies, setMovies] = useState([]);
  const MOVIES_PER_PAGE = 20;

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const response = await fetchUpdatedMovies(currentPage);
      if (response) {
        setMovies(response?.items);
      }
      setLoading(false);
    };
    fetchData();
  }, [filters, currentPage]);

  // Pagination logic
  // Calculate page numbers to display
  const getPageNumbers = () => {
    const range = 2; // how many pages before/after current
    const pages = [];
    for (let i = currentPage - range; i <= currentPage + range; i++) {
      if (i > 0) pages.push(i);
    }
    return pages;
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="pt-20">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          New and Popular Movie
        </h1>
        <p className="text-gray-300 text-lg">
          A collection of the best TV series, continuously updated.
        </p>
      </div>

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
        ) : movies?.length !== 0 ? (
          movies?.length !== 0 ? (
            movies?.map((movie: any, _id) => {
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

      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              className={`text-xl${
                currentPage === 1 ? " pointer-events-none opacity-50" : ""
              }`}
              onClick={() => {
                if (currentPage !== 1) setCurrentPage((p) => p - 1);
              }}
            />
          </PaginationItem>
          {getPageNumbers().map((pageNum) => (
            <PaginationItem key={pageNum}>
              <PaginationLink
                href="#"
                className={`text-xl${
                  currentPage === pageNum ? " font-bold text-red-500" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(pageNum);
                }}
              >
                {pageNum}
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
                movies.length === 0 ? " pointer-events-none opacity-50" : ""
              }`}
              onClick={() => handleNextPage()}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default NewPopularMovies;
