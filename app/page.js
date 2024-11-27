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
    <div className="font-mono min-h-screen flex flex-col items-center justify-between">
      <Navbar />

      <div className="flex flex-col gap-6 items-center justify-center flex-grow w-full px-4 sm:px-8">
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl w-full max-w-md">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-indigo-600">
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
            className="w-full bg-black h-[50px] flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-transform duration-300 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-white"
            disabled={loading}
          >
            {loading ? "Shortening..." : "Short It"}
          </button>
          {shortUrl && (
            <div className="mt-4 text-center text-lg text-gray-700 break-words">
              <span className="font-semibold">Shortened URL:</span>
              <a
                href={shortUrl}
                className="text-indigo-500 underline block hover:text-indigo-700 break-words"
                target="_blank"
                rel="noopener noreferrer"
              >
                {shortUrl}
              </a>
            </div>
          )}
        </div>

        <Link href={"stats"}>
          <button className="relative overflow-hidden rounded-lg h-12 w-full max-w-xs group hover:animate-pulse hover:shadow-lg hover:scale-105 transition duration-300 before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-pink-400 before:via-purple-400 before:to-indigo-400">
            <span className="relative text-white font-bold px-8 py-2">
              Get Link Stats
            </span>
          </button>
        </Link>
      </div>

      <Footer />
    </div>
  );
}
