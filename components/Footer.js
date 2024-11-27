// components/Footer.js
import { Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-8">
      <div className="  max-w-4xl mx-auto px-4">
        <Link className="flex items-center justify-center gap-2 " href={"https://www.linkedin.com/in/alok-28-ky"} >
          <p className="text-xl  text-center mt-1">
            Made by <span className="font-bold">Alok</span>
          </p>
          <p className="hover:text-indigo-500 transition-colors">
            <Linkedin size={24} />
          </p>
        </Link>
      </div>
    </footer>
  );
}
