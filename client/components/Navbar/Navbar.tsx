"use client";
import { Bell, ChevronDown, Search, UserRoundPen } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { logout } from "@/firebase";

function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          <li className="cursor-pointer">Home</li>
          <li className="cursor-pointer">TV Shows</li>
          <li className="cursor-pointer">Movies</li>
          <li className="cursor-pointer">New & Popular</li>
          <li className="cursor-pointer">My List</li>
          <li className="cursor-pointer">Browse by Language</li>
        </ul>
      </div>
      <div className="flex items-center gap-5">
        <Search className="cursor-pointer w-[20px]" />
        <p>Children</p>
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
