"use client";
import React, { useEffect, useState } from "react";
import { fetchMovies } from "@/lib/api/phimapi";
import MovieCard from "../MovieCard/MovieCard";

function TitleCards({ title, path }: { title?: string; path?: string }) {
  const [movies, setMovies] = useState<any>(null);

  useEffect(() => {
    async function getMovies() {
      const data = await fetchMovies(path || "");
      setMovies(data?.items || []);
    }
    getMovies();
  }, []);

  return (
    <div className="w-full  overflow-visible">
      <div className="relative w-full my-4 overflow-visible">
        <h2 className="mb-2 absolute top-23">{title}</h2>
        <div className="flex gap-2.5 overflow-x-auto pt-30 scroll-smooth no-scrollbar">
          {movies?.length > 0
            ? movies.map((movie: any, index: number) => (
                <MovieCard
                  key={index}
                  movie={movie}
                  index={index}
                  length={movies?.length}
                />
              ))
            : [1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
                <div
                  key={index}
                  className="w-[180px] h-[262px] bg-neutral-800 rounded-md animate-pulse"
                ></div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default TitleCards;
