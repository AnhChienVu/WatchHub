"use client";

import { getUserProfile } from "@/lib/user/getUserProfile";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Profiles() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const userData = getUserProfile();
    if (userData) {
      setUser(userData);
    }
  }, []);
  return (
    <div className="flex items-center h-screen justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">
          Who is watching?
        </h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <div>
            <div
              onClick={() => {
                router.push("/");
              }}
              className="group flex-row w-44 mx-auto"
            >
              <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
                <img
                  className="object-cover w-full h-full"
                  src="/profile.jpg"
                  alt="profile image"
                />
              </div>
              <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
                {user?.displayName}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profiles;
