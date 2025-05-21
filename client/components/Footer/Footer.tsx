import React from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";

function Footer() {
  return (
    <div className="p-4 max-w-[1000px] mx-auto mt-20">
      <div className="flex justify-center gap-4 mb-4">
        <FaFacebookSquare className="cursor-pointer text-[30px]" />
        <FaInstagramSquare className="cursor-pointer text-[30px]" />
      </div>
      <div className="grid grid-cols-4 gap-4 text-lg text-gray-300">
        <div className="col-span-1">
          <h2>Audio Description</h2>
          <h2>Help Centre</h2>
          <h2>Gift Cards</h2>
        </div>
        <div className="col-span-1">
          <h2>Media Centre</h2>
          <h2>Investor Relations</h2>
          <h2>Jobs</h2>
        </div>
        <div className="col-span-1">
          <h2>Terms of Use</h2>
          <h2>Privacy</h2>
          <h2>Legal Notices</h2>
        </div>
        <div className="col-span-1">
          <h2>Cookies Preferences</h2>
          <h2>Corporate Information</h2>
          <h2>Contact Us</h2>
        </div>
      </div>
      <p className="pt-10 text-center text-md text-gray-400">
        © 2025 Anh Chien Vu. All rights reserved.
      </p>
    </div>
  );
}

export default Footer;
