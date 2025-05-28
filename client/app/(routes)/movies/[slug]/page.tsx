import React, { use, useEffect, useState } from "react";
import { MovieDetailsResponse } from "@/lib/types";

async function MovieDetails({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  async function fetchMovieDetails(slug: string) {
    const res = await fetch(`https://phimapi.com/phim/${slug}`);
    if (!res.ok) throw new Error("Failed to fetch movie details");
    const data = await res.json();
    return data;
  }
  const movie: MovieDetailsResponse = await fetchMovieDetails(slug);
  console.log("Movie Details: ", movie);

  return (
    <div className="pt-20">
      <div className="container mx-auto py-8">
        {/* Movie Header (Poster + Basic Info) */}
        <div className="flex flex-col md:flex-row gap-8">
          <img
            src={movie.movie.poster_url}
            alt={movie.movie.name}
            className="w-full md:w-1/3 rounded-lg"
          />
          <div className="md:w-2/3">
            <h1 className="text-3xl font-bold">{movie.movie.name}</h1>
            <p className="text-gray-400">{movie.movie.origin_name}</p>
            <div className="flex gap-2 mt-4">
              <span className="bg-blue-500 px-2 py-1 rounded text-sm">
                {movie.movie.quality}
              </span>
              <span className="bg-green-500 px-2 py-1 rounded text-sm">
                {movie.movie.lang}
              </span>
            </div>
            <p className="mt-4">{movie.movie.content}</p>
            <div>
              {movie.movie.trailer_url ? (
                <iframe
                  src={`https://www.youtube.com/embed/${
                    movie.movie.trailer_url.split("v=")[1]
                  }`}
                  allowFullScreen
                  className="w-full aspect-video rounded-lg"
                ></iframe>
              ) : (
                <p>There is no trailer for this movie</p>
              )}
            </div>
          </div>
        </div>

        {/* Episodes List */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Episodes</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {movie.episodes[0].server_data.map((episode) => (
              <a
                key={episode.slug}
                href={episode.link_embed}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700"
              >
                {episode.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
