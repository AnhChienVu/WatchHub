"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function Login() {
  const [signState, setSignState] = useState("Sign In");

  return (
    <div
      className="h-screen w-full flex items-center justify-center  text-white"
      style={{
        backgroundImage: "url('/background_banner.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 z-0"></div>
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-md p-6 rounded-lg shadow-lg">
        <Image src="/logo.png" alt="logo" height={100} width={150} />
        <div className="w-full max-w-[600px] rounded-sm p-12 mx-auto bg-black/90">
          <h1 className="text-[30px] font-bold mb-7 text-center">
            {signState}
          </h1>
          <form>
            {signState === "Sign Up" && (
              <Input
                className="px-4 py-5 mx-3 my-4 bg-[#333] border-none rounded-sm text-lg font-bold"
                type="text"
                placeholder="Your Name"
              />
            )}

            <Input
              className="px-4 py-5 mx-3 my-4 bg-[#333] border-none rounded-sm text-lg font-bold"
              type="email"
              placeholder="Email"
            />
            <Input
              className="px-4 py-5 mx-3 my-4 bg-[#333] border-none rounded-sm text-lg font-bold"
              type="password"
              placeholder="Password"
            />
            <Button
              className="px-4 py-5 mx-3 my-4 w-full boder-none p-4 outline-none bg-[#e50914] text-white text-lg font-bold rounded-sm cursor-pointer hover:bg-[#f40612] transition duration-200"
              type="submit"
            >
              {signState}
            </Button>
            <div className="flex items-center justify-around text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Input id="checkbox" className="w-3 h-3" type="checkbox" />
                <label htmlFor="checkbox" className="cursor-pointer">
                  Remember Me
                </label>
              </div>
              <p className="cursor-pointer">Need Help?</p>
            </div>
          </form>
          <div className="mt-4 text-center ">
            {signState === "Sign In" ? (
              <p className="text-sm text-gray-400 p-1">
                New to Netflix?{" "}
                <span
                  onClick={() => setSignState("Sign Up")}
                  className="ml-1.5 font-bold cursor-pointer text-gray-100"
                >
                  Sign Up Now
                </span>
              </p>
            ) : (
              <p className="text-sm text-gray-400 p-1">
                Already have account?{" "}
                <span
                  onClick={() => setSignState("Sign In")}
                  className="ml-1.5 font-bold cursor-pointer text-gray-100"
                >
                  Sign In Now
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
