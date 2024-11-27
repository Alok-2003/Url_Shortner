"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleShorten = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/shorten", { originalUrl: url });
      setShortUrl(data.shortUrl);
    } catch (error) {
      console.error(error);
      alert("Failed to shorten URL");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-mono">
      <Navbar/>
      <div className="flex flex-col gap-4  items-center justify-center h-[80vh] w-full   ">
        <div className="bg-white p-8 rounded-lg shadow-xl">
          <h1 className="text-4xl font-bold mb-4 text-center text-indigo-600">
            URL Shortener
          </h1>
          <div className="mb-4">
            <input
              type="url"
              placeholder="Enter a URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-4 py-2 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <button
            onClick={handleShorten}
            className="w-full bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]"
            disabled={loading}
          >
            {loading ? "Shortening..." : "Shorten"}
          </button>
          {shortUrl && (
            <div className="mt-4 text-center  text-lg text-gray-700">
              Shortened URL:{" "}
              <a
                href={shortUrl}
                className="text-indigo-500 underline block hover:text-indigo-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                {shortUrl}
              </a>
            </div>
          )}
        </div>
        <Link href={"stats"} className="">
          <button class="relative overflow-hidden rounded-lg h-12 group hover:animate-pulse hover:shadow-lg hover:scale-105 transition duration-500 before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-pink-400 before:via-purple-400 before:to-indigo-400">
            <span class="relative text-white font-bold px-8 py-8">
              {" "}
              Get Link Stats{" "}
            </span>
          </button>
        </Link>
      </div>
      <Footer/>
    </div>
  );
}
