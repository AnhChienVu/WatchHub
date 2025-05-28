"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { getUserProfile } from "@/lib/user/getUserProfile";
import { IoIosHeartDislike } from "react-icons/io";

function MovieCard({
  movie,
  index,
  length,
  onRemoveFavorite,
}: {
  movie: any;
  index: number;
  length: number;
  onRemoveFavorite: (slug: string) => void;
}) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const userData = getUserProfile();
    if (userData) {
      setUser(userData);
    }
  }, []);

  useEffect(() => {
    if (user && movie) {
      checkFavorite(movie);
    }
  }, [user, movie]);

  const handleOpenMovie = (movie: any) => {
    router.push(`/movies/${movie?.slug}`);
  };

  const handleSaveFavorite = async (movie: any) => {
    if (user) {
      const response = await fetch("/api/movie/addToFavorite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug: movie?.slug, email: user?.email }),
      });
      const data = await response.json();
      if (data.success) {
        console.log("Movie added to favorites");
      } else {
        console.error("Error adding movie to favorites");
      }
    }
  };

  const checkFavorite = async (movie: any) => {
    if (user) {
      const response = await fetch(
        `/api/movie/checkMovieAsFav?slug=${movie?.slug}&userEmail=${user?.email}`
      );
      const data = await response.json();
      if (data.success) {
        console.log("Movie is in favorites:", data.isFavorite);
        setIsFavorite(data.isFavorite);
      } else {
        console.error("Error checking movie in favorites");
        setIsFavorite(false);
      }
    }
  };

  const handleRemoveFavorite = async (movie: any) => {
    try {
      if (user) {
        setIsFavorite(false);
        const response = await fetch(`/api/movie/removeFavoriteMovie`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ slug: movie?.slug, email: user?.email }),
        });
        const data = await response.json();
        if (data.success) {
          console.log("Movie is removed from favorites:");
          if (onRemoveFavorite) onRemoveFavorite(movie.slug); // <-- call parent callback
        } else {
          console.error("Error removing movie in favorites");
          setIsFavorite(true);
        }
      }
    } catch (error) {
      console.error("Network error removing favorite:", error);
      setIsFavorite(true);
    }
  };

  return (
    // <div
    //   onClick={() => handleOpenMovie(movie)}
    //   key={index}
    //   className="relative flex-shrink-0 group z-0 hover:z-10"
    // >
    //   <div
    //     className={
    //       "w-full transition-transform duration-200 group-hover:scale-110 md:group-hover:scale-120 lg:group-hover:scale-150 group-hover:z-10 z-0 " +
    //       (index === 0
    //         ? "origin-left"
    //         : index === length - 1
    //         ? "origin-right"
    //         : "origin-bottom")
    //     }
    //   >
    //     <Image
    //       src={movie.poster_url}
    //       alt="movie image"
    //       width={230}
    //       height={280}
    //       className="w-[100px] h-[150px] md:w-[180px] md:h-[220px] lg:w-[190px] lg:h-[230px] xl:w-[230px] xl:h-[280px] rounded-sm cursor-pointer object-cover"
    //     />
    //   </div>
    // </div>

    <div className="group bg-transaprent col-span relative flex-shrink-0">
      <img
        className="cursor-pointer object-cover transition duration shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-300 w-[100px] h-[150px] md:w-[180px] md:h-[220px] lg:w-[190px] lg:h-[230px] xl:w-[230px] xl:h-[280px]"
        src={movie.poster_url}
        alt="thumbnail"
      />
      <div className="opacity-0 absolute top-0 transition duration-200 z-10 invisible sm:visible delay-200 w-full scale-0 group-hover:scale-120 group-hover:-translate-y-[15vw]  group-hover:opacity-100">
        <img
          src={movie.poster_url}
          alt="thumbnail"
          className="cursor-pointer object-cover transition duration shadow-xl rounded-t-md w-full"
        />
        <div className="z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md">
          <div className="flex  items-center gap-3">
            <div
              className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex items-center justify-center transition hover:bg-neural-300"
              onClick={() => {
                handleOpenMovie(movie);
              }}
            >
              <FaPlay className="text-black " />
            </div>
            {isFavorite ? (
              <div
                className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex items-center justify-center transition hover:bg-neural-300"
                onClick={() => {
                  handleRemoveFavorite(movie);
                }}
              >
                <IoIosHeartDislike className="text-black " />
              </div>
            ) : (
              <div
                className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex items-center justify-center transition hover:bg-neural-300"
                onClick={() => {
                  handleSaveFavorite(movie);
                }}
              >
                <FaCheck className="text-black " />
              </div>
            )}
          </div>
          {/* <p className="text-green-400 font-semibold mt-4">
            New <span className="text-white">2023</span>
          </p> */}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
