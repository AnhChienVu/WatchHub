"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { handleGoogleSignIn, signIn, signUp } from "@/firebase";
import netflix_spinner from "@/public/netflix_spinner.gif";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

function Login() {
  const [signState, setSignState] = useState("Sign In");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const user_auth = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    if (signState === "Sign In") {
      try {
        // Call signIn function from firebase.ts
        const user = await signIn(email, password);
        
        // Only store user in localStorage if sign-in was successful
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          // Redirect to profiles page
          window.location.href = "/profiles";
        } else {
          console.error("Sign in failed - no user returned");
          toast.error("Sign in failed. Please check your credentials.");
        }
      } catch (error) {
        console.error("Error during sign in:", error);
        toast.error("An error occurred during sign in.");
      }
    } else {
      try {
        // Call signUp function from firebase.ts
        await signUp(name, email, password);
        await fetch("/api/user/addNewUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, name }),
        });
        setSignState("Sign In");
        setEmail("");
        setPassword("");
        setName("");
      } catch (error) {
        console.error("Error during sign up:", error);
        toast.error("An error occurred during sign up.");
      }
    }
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <div className="w-full h-screen flex items-center justify-center">
          <Image
            src={netflix_spinner}
            alt="Loading..."
            width={100}
            height={100}
          />
        </div>
      ) : (
        <div
          className="h-screen w-full flex items-center justify-center  text-white"
          style={{
            backgroundImage: "url('/background_banner.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 z-0"></div>
          <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-md p-2 md:p-6 rounded-lg shadow-lg">
            <Image
              src="/logo.png"
              alt="logo"
              height={100}
              width={150}
              className="w-20 h-10 md:w-30 md:h-15"
            />
            <div className=" rounded-sm w-[300px] md:w-full px-5 md:px-6 lg:px-8 mx-auto bg-black/90">
              <h1 className="text-[25px] md:text-[30px] font-bold my-3 text-center">
                {signState}
              </h1>
              <form onSubmit={user_auth}>
                {signState === "Sign Up" && (
                  <Input
                    className="py-2 md:py-5 my-4 bg-[#333] border-none rounded-sm text-lg font-bold"
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                )}

                <Input
                  className="py-2 md:py-5 my-4 bg-[#333] border-none rounded-sm text-lg font-bold focus:outline-none appearance-none"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  className="py-2 md:py-5 my-4 bg-[#333] border-none rounded-sm text-lg font-bold"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  className="py-2 md:py-5 my-2 w-full boder-none p-4 outline-none bg-[#e50914] text-white text-lg font-bold rounded-sm cursor-pointer hover:bg-[#f40612] transition duration-200"
                  type="submit"
                  disabled={!(email && password && loading === false)}
                >
                  {signState}
                </Button>
                <div className="flex items-center gap-4 mt-4 justify-center">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opcaity-80 transition duration-200">
                    <FcGoogle
                      onClick={() => {
                        handleGoogleSignIn();
                      }}
                      size={30}
                    />
                  </div>
                </div>
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
              <div className="my-4 text-center ">
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
      )}
    </>
  );
}

export default Login;
