"use client";
import { useState, useEffect } from "react";
import { NAV_LINKS } from "../share/data";
import Image from "next/image";
import Link from "next/link";
import { ASSETS } from "../share/assets";
import Button from "@/app/components/button";
import { FaCommentMedical } from "react-icons/fa";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed border-bottom border-gray-400 top-0 left-0 w-full z-50 border-b transition-all duration-300 ${
        scrolled
          ? "bg-linear-to-r from-[#1E2433]/90 via-[#3D2F78]/90 to-[#1E2433]/90 border-[#2B3142] backdrop-blur-md"
          : "bg-transparent "
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <div className="flex items-center h-[60px]">
          <div className="h-[60px] w-[60px] flex items-center justify-center">
            <Image
              src={ASSETS.logo}
              alt="Logo"
              width={80}
              height={80}
              className="rounded-full object-contain absolute"
              priority
            />
          </div>
          <span className="font-semibold text-xl text-white leading-none">
            Clarity&nbsp;
            <span className="bg-linear-to-r from-[#7C3AED] to-[#2563EB] bg-clip-text text-transparent">
              Cosmos
            </span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm text-white">
          {NAV_LINKS.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href="">
          <Button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white flex items-center gap-2 px-5 py-2 rounded-lg text-md font-semibold transition-all duration-300 shadow-md">
            <FaCommentMedical className="w-3 h-3 text-white" />
            <span>Try Beta Free</span>
          </Button>
        </Link>
      </div>
    </header>
  );
}
