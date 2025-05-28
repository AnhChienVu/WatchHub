"use client";
import React, { useEffect, useState } from "react";
import { fetchMovies } from "@/lib/api/phimapi";
import MovieCard from "../MovieCard/MovieCard";

function TitleCards({ title, path }: { title?: string; path?: string }) {
  const [movies, setMovies] = useState<any>(null);

  const handleRemoveFavorite = (slug: string) => {
    setMovies((prev: any) => prev.filter((movie: any) => movie.slug !== slug));
  };

  useEffect(() => {
    async function getMovies() {
      const data = await fetchMovies(path || "");
      setMovies(data?.items || []);
    }
    getMovies();
  }, []);

  return (
    <div className="w-full  overflow-visible">
      <div className="relative w-full my-2 md:my-4 overflow-visible">
        <h2 className="absolute top-20 lg:top-18 text-lg md:text-[25px] lg:text-[30px] font-bold">
          {title}
        </h2>
        <div className="flex gap-2.5 overflow-x-auto pt-30 scroll-smooth no-scrollbar">
          {movies?.length > 0
            ? movies.map((movie: any, index: number) => (
                <MovieCard
                  key={index}
                  movie={movie}
                  index={index}
                  length={movies?.length}
                  onRemoveFavorite={handleRemoveFavorite}
                />
              ))
            : [1, 2, 3, 4, 5, 6].map((_, index) => (
                <div
                  key={index}
                  className="w-[100px] h-[150px] md:w-[180px] md:h-[220px] lg:w-[190px] lg:h-[230px] xl:w-[230px] xl:h-[280px] bg-neutral-800 rounded-md animate-pulse"
                ></div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default TitleCards;
