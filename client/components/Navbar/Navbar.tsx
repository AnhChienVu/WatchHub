"use client";
import { Bell, ChevronDown, Search } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { logout } from "@/firebase";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearch = () => {
    const searchInput = navRef.current?.querySelector("input");
    console.log("searchInput: ", searchInput);
    if (searchInput) {
      const keyword = searchInput.value;
      if (keyword) {
        window.location.href = `/search/${keyword}`;
      }
    }
  };

  return (
    <div
      ref={navRef}
      className={`w-full flex justify-between items-center px-5 py-1.5 fixed text-sm text-[#e5e5e5] z-1 transition-colors duration-300 ${
        scrolled ? "bg-[#141414]" : "bg-transparent"
      }`}
    >
      <div className="flex items-center gap-10">
        <Image src="/logo.png" alt="logo" width={90} height={50} />
        <ul className="hidden md:hidden lg:flex gap-5 md:text-lg font-bold">
          <li className="cursor-pointer">
            <Link href="/">Home</Link>
          </li>
          <li className="cursor-pointer">
            <DropdownMenu>
              <DropdownMenuTrigger>Categories</DropdownMenuTrigger>
              <DropdownMenuContent className="w-45 h-45 flex flex-col items-center bg-black text-white border-none">
                <DropdownMenuItem
                  asChild
                  className="text-lg text-semibold w-full justify-center hover:bg-slate-300 cursor-pointer"
                >
                  <Link href="/categories/phim-bo">Movie Series</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  asChild
                  className="text-lg text-semibold w-full justify-center hover:bg-slate-300 cursor-pointer"
                >
                  <Link href="/categories/phim-le">Movies</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  asChild
                  className="text-lg text-semibold w-full justify-center hover:bg-slate-300 cursor-pointer"
                >
                  <Link href="/categories/tv-shows">TV Shows</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  asChild
                  className="text-lg text-semibold w-full justify-center hover:bg-slate-300 cursor-pointer"
                >
                  <Link href="/categories/hoat-hinh">Cartoons</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
          <li className="cursor-pointer">
            <Link href="/new-popular">New & Popular</Link>
          </li>
          <li className="cursor-pointer">
            <Link href="/myList">My List</Link>
          </li>
        </ul>
      </div>
      <div className="flex items-center gap-5">
        <div
          className={`flex justify-between gap-2 items-center rounded-lg px-2 py-1.5 text-[#e5e5e5] z-1 transition-colors duration-300 ${
            scrolled ? "bg-white" : "bg-slate-50"
          }`}
        >
          <input
            type="text"
            placeholder="Search"
            className={`text-lg text-black border-none outline-none px-2 rounded-sm w-[200px] md:w-[300px] lg:w-[400px] ${
              scrolled ? "bg-white" : "bg-slate-50"
            }`}
          />
          <Search
            onClick={() => handleSearch()}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            className="cursor-pointer w-[22px] text-black hover:text-slate-700"
          />
        </div>

        <Bell className="cursor-pointer w-[20px]" />
        <div className="flex items-center gap-2 cursor-pointer">
          <Image
            src="/profile_img.png"
            alt="profile"
            width={30}
            height={30}
            className="rounded-sm w-[35px]"
          />
          <div className="mt-5">
            <Popover>
              <PopoverTrigger>
                <ChevronDown />
              </PopoverTrigger>
              <PopoverContent className="bg-[#191919] w-45">
                <h2
                  onClick={() => logout()}
                  className="text-white cursor-pointer hover:underline text-sm"
                >
                  Sign Out of WatchHub
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
