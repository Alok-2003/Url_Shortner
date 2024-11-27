"use client";

import { useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { House } from "lucide-react";
import Footer from "@/components/Footer";

export default function Stats() {
  const [urlInput, setUrlInput] = useState(""); // Updated to handle full URL input
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  // Extract shortId from the full URL
  const extractShortId = (url) => {
    try {
      const urlObj = new URL(url);
      return urlObj.pathname.slice(1); // Assuming shortId is right after "/"
    } catch (error) {
      return url; // If URL constructor fails, treat it as shortId directly
    }
  };

  const fetchStats = async () => {
    setLoading(true);
    setStats(null); // Clear previous stats
    try {
      const shortId = extractShortId(urlInput);
      //   console.log(shortId);

      const { data } = await axios.get(`/api/stats/${shortId}`);
      setStats(data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch stats. Please check the URL or Short ID.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <main className="flex flex-col items-center justify-center h-[80vh]">
        <div className="flex flex-col gap-4 items-center justify-center h-[90vh] w-full">
          <div className="bg-white p-8 rounded-lg shadow-xl ">
            <h1 className="text-4xl font-bold mb-6 text-center text-indigo-600">
              URL Statistics
            </h1>

            <div className="mb-6">
              <input
                type="text"
                placeholder="Paste short URL or enter Short ID"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="w-full px-4 py-2 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <button
              onClick={fetchStats}
              className="w-full bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]"
              disabled={loading}
            >
              {loading ? "Fetching..." : "Get Stats"}
            </button>

            {stats && (
              <div className="mt-6 text-center text-lg text-gray-700 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-gray-600">
                    Original URL:
                  </span>
                  <span className="text-gray-800">{stats.originalUrl}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-gray-600">
                    Click Count:
                  </span>
                  <span className="text-gray-800">{stats.clickCount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-gray-600">
                    Last Accessed:
                  </span>
                  <span className="text-gray-800">
                    {new Date(stats.lastAccessed).toLocaleString()}
                  </span>
                </div>
              </div>
            )}
          </div>

          <Link href="/" className="w-full flex justify-center max-w-md">
            <button className="relative overflow-hidden rounded-lg h- group hover:animate-pulse hover:shadow-lg hover:scale-105 transition duration-500 before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-pink-400 before:via-purple-400 before:to-indigo-400">
              <span className="relative text-white font-bold px-8 py-2">
              <House size={27} className="mx-4 " />
              </span>
            </button>
          </Link>
        </div>
      </main>
      <Footer/>
    </div>
  );
}
