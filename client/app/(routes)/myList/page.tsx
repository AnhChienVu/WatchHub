"use client";

import MovieCard from "@/components/MovieCard/MovieCard";
import { fetchMovieDetailsBySlug } from "@/lib/api/fetchMovieDetailsBySlug";
import { getUserProfile } from "@/lib/user/getUserProfile";
import React, { useEffect, useState } from "react";

function myList() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favoriteMovies, setFavoriteMovies] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  const handleRemoveFavorite = async (slug: string) => {
    // Remove from backend first
    await fetch("/api/movie/removeFavoriteMovie", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, email: user?.email }),
    });
    setFavoriteMovies((prev: any) =>
      prev.filter((movie: any) => movie.movie.slug !== slug)
    );
    setFavorites((prev) => prev.filter((movieSlug) => movieSlug !== slug));
  };

  useEffect(() => {
    const userData = getUserProfile();
    if (userData) {
      setUser(userData);
    }
  }, []);

  useEffect(() => {
    user && getFavorites();
  }, [user]);

  // useEffect(() => {
  //   if (favorites && favorites.length > 0) {
  //     fetchAllFavoriteMovies(favorites).then(setFavoriteMovies);
  //   }
  // }, []);

  const getFavorites = async () => {
    try {
      const response = await fetch(
        `/api/movie/getFavorites?userEmail=${user?.email}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch favorites");
      }
      const data = await response.json();
      if (data.success) {
        setFavorites(data.favoriteList);
        fetchAllFavoriteMovies(data.favoriteList).then(setFavoriteMovies);
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const fetchAllFavoriteMovies = async (favorites: string[]) => {
    const movies = await Promise.all(
      favorites.map((fav) => fetchMovieDetailsBySlug(fav))
    );
    return movies;
  };

  const removeFavorite = async (movieId: Number) => {};
  console.log("Fav Movies: ", favoriteMovies);
  return (
    <div className="container mx-auto px-4 pb-8 pt-30">
      <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-6">
        My Favorite Movies
      </h1>

      {favorites?.length === 0 ? (
        <p>You don't have any favorite movies in your list!</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {favoriteMovies?.map((movie, _idx) => (
            <div key={_idx} className="relative group">
              <MovieCard
                movie={movie?.movie}
                index={_idx}
                length={favorites?.length}
                onRemoveFavorite={handleRemoveFavorite}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default myList;
