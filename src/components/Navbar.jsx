"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Browse Jobs", href: "/jobs" },
    { name: "Company", href: "/company" },
    { name: "Pricing", href: "/pricing" },
  ];

  return (
    <nav className="w-full fixed top-0 z-50 bg-[#0f0f0f]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* LEFT: Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
            P
          </div>
          <span className="text-white font-semibold text-lg">
            Hire Loop
          </span>
        </Link>

        {/* RIGHT: Menu + Button */}
        <div className="hidden md:flex items-center gap-6 ml-auto">
          
          {/* Menu Container */}
          <div className="flex items-center gap-6 bg-white/5 px-6 py-2 rounded-full backdrop-blur-md">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-white transition"
              >
                {link.name}
              </Link>
            ))}


          </div>
            <span className="h-5 w-px bg-white/20" />
            <Link
              href="/signin"
              className="text-purple-400 hover:text-purple-300"
            >
              Sign In
            </Link>

          {/* CTA Button */}
          <Button className="bg-white text-black rounded-xl px-5">
            Get Started
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white ml-auto"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <div className="bg-[#1a1a1a] rounded-xl p-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-300"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <Link href="/signin" className="text-purple-400">
              Sign In
            </Link>

            <Button className="bg-white text-black w-full">
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;