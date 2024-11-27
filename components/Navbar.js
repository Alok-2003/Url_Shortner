"use client"
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex w-full justify-center items-center mt-4">
        <Link href={"/"}  className="relative inline-flex h-12 w-[90%] lg:w-1/2 active:scale-95 transistion overflow-hidden rounded-lg p-[1px] focus:outline-none">
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e7029a_0%,#f472b6_50%,#bd5fff_100%)]"></span>
          <span className="inline-flex h-full w-full  items-center justify-center rounded-lg bg-slate-950 px-7 text-2xl  text-white font-bold backdrop-blur-3xl gap-2 undefined">
            Link Crusher
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 448 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M429.6 92.1c4.9-11.9 2.1-25.6-7-34.7s-22.8-11.9-34.7-7l-352 144c-14.2 5.8-22.2 20.8-19.3 35.8s16.1 25.8 31.4 25.8H224V432c0 15.3 10.8 28.4 25.8 31.4s30-5.1 35.8-19.3l144-352z"></path>
            </svg>
          </span>
        </Link>
      </nav>
  )
}

export default Navbar