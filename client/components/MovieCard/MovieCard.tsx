import Image from "next/image";
import React, { use } from "react";
import { useRouter } from "next/navigation";

function MovieCard({
  movie,
  index,
  length,
}: {
  movie: any;
  index: number;
  length: number;
}) {
  const router = useRouter();
  const handleOpenMovie = (movie: any) => {
    router.push(`/movies/${movie?.slug}`);
  };

  return (
    <div
      onClick={() => handleOpenMovie(movie)}
      key={index}
      className="relative flex-shrink-0 group z-0 hover:z-10"
    >
      <div
        className={
          "w-full transition-transform duration-200 group-hover:scale-110 md:group-hover:scale-120 lg:group-hover:scale-150 group-hover:z-10 z-0 " +
          (index === 0
            ? "origin-left"
            : index === length - 1
            ? "origin-right"
            : "origin-bottom")
        }
      >
        <Image
          src={movie.poster_url}
          alt="movie image"
          width={100}
          height={150}
          className="w-[100px] h-[150px] md:w-[180px] md:h-[220px] lg:w-[190px] md:h-[230px] lg:w-[230px] md:h-[280px] rounded-sm cursor-pointer object-cover"
        />
      </div>
    </div>
  );
}

export default MovieCard;
