"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Info, PlayCircle } from "lucide-react";
import TitleCards from "../TitleCards/TitleCards";
import { useRouter } from "next/navigation";

function Hero() {
  const [bannerMovie, setBannerMovie] = useState<any>();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getBannerMovie = async () => {
    const res = await fetch(
      "https://phimapi.com/danh-sach/phim-moi-cap-nhat-v3?page=1"
    );
    const data = await res.json();
    console.log(data);
    setBannerMovie(data.items[0]);
    const movieDetails = await fetchMovieDetails(data.items[0].slug);
    setBannerMovie((prev: any) => ({ prev, movie: movieDetails }));
    setLoading(false);
  };

  useEffect(() => {
    getBannerMovie();
  }, []);

  if (loading || !bannerMovie) {
    return (
      <div className="w-full h-[600px] bg-neutral-800 rounded-md animate-pulse"></div>
    );
  }

  async function fetchMovieDetails(slug: string) {
    const res = await fetch(`https://phimapi.com/phim/${slug}`);
    if (!res.ok) throw new Error("Failed to fetch movie details");
    const data = await res.json();
    return data;
  }

  const openMovie = async (slug: string) => {
    router.push(`/movies/${slug}`);
  };
  console.log("Banner Movie: ", bannerMovie?.movie?.movie?.trailer_url);
  return (
    <div>
      <div className="relative w-full pt-[80%] md:pt-[75%] lg:pt-[60%] xl:pt-[50%]">
        {bannerMovie ? (
          <div>
            {/* <Image
              className="w-full h-[400px] md:h-[700px] lg:h-[1000px] relative top-0 object-cover object-[50%_20%]"
              src={bannerMovie?.poster_url}
              alt="banner"
              width={500}
              height={1000}
              style={{
                maskImage: "linear-gradient(to right, transparent, black 75%)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent, black 75%)",
              }}
            /> */}
            <iframe
              className="absolute top-10 left-0 w-full h-full object-cover object-[50%_20%]"
              src={
                bannerMovie?.movie?.movie?.trailer_url
                  ? `https://www.youtube.com/embed/${
                      bannerMovie.movie.movie.trailer_url.split("v=")[1]
                    }?modestbranding=1&showinfo=0&rel=0&autoplay=1&controls=0`
                  : ""
              }
              title="YouTube video player"
              allow="autoplay; encrypted-media"
            ></iframe>
            <div className="absolute bottom-0 left-0 w-full pl-1.5 flex flex-col items-start gap-1 overflow-visible">
              <p className="max-w-[700px] text-sm md:text-xl mb-2 md:mb-5">
                {bannerMovie?.origin_name} - {bannerMovie?.episode_current}
              </p>
              <div className="flex gap-2 md:gap-4 z-10">
                <Button
                  onClick={() => {
                    openMovie(bannerMovie?.slug);
                  }}
                  className="flex gap-1 md:gap-2 items-center mb-5 md:mb-10 px-2 py-2 md:py-5 text-sm md:text-lg font-bold bg-white text-black rounded-sm cursor-pointer hover:bg-gray-300"
                >
                  <PlayCircle className="w-2 md:w-10" /> Play
                </Button>
                <Button className="flex gap-1 md:gap-2 items-center mb-5 md:mb-10 px-2 py-2 md:py-5 text-sm md:text-lg font-bold bg-[#6d6d6e] text-white rounded-sm cursor-pointer hover:bg-gray-600">
                  <Info className="w-2 md:w-6" /> More Info
                </Button>
              </div>
              <div className="hidden md:block lg:block -mt-35 -mb-10">
                <TitleCards path="/danh-sach/phim-moi-cap-nhat-v3?page=1" />
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-[600px] bg-neutral-800 rounded-md animate-pulse"></div>
        )}
      </div>

      <div className="pl-[3%] flex flex-col mt-10 md:mt-40 lg:mt-40 xl:mt-50">
        <div className="md:-mt-40 lg:-mt-30">
          <TitleCards
            title="New Films"
            path="/danh-sach/phim-moi-cap-nhat-v3?page=1"
          />
        </div>
        <div className="-mt-20">
          <TitleCards
            title="Only on WatchHub"
            path="/danh-sach/phim-moi-cap-nhat-v3?page=2"
          />
        </div>
        <div className="-mt-20">
          <TitleCards
            title="Upcoming"
            path="/danh-sach/phim-moi-cap-nhat-v3?page=3"
          />
        </div>
        <div className="-mt-20">
          <TitleCards
            title="Top Pick For You"
            path="/danh-sach/phim-moi-cap-nhat-v3?page=4"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
