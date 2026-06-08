"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { Menu, X } from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client"; // signOut import kora holo

const Navbar = () => {
  const { data: session, isPending } = useSession();
  // console.log('session data in Navbar:', session, "is pending:", isPending);
  const [isOpen, setIsOpen] = useState(false);
  const user = session?.user;

  const navLinks = [
    { 
      name: "Browse Jobs", 
      href: "/jobs" 
    },
    { 
      name: "Company", 
      href: "/dashboard/recruiter/company" 
    },
    { 
      name: "Pricing", 
      href: "/plans" 
    },
  ];

  // Sign out handler
  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.reload(); // Sign out er por refresh korbe
        },
      },
    });
  };

  return (
    <nav className="w-full fixed top-0 z-50 bg-[#0f0f0f]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* LEFT: Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-linear-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
            P
          </div>
          <span className="text-white font-semibold text-lg">
            Hire Loop
          </span>
        </Link>

        {/* RIGHT: Desktop Menu */}
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

          {/* Session loading state vs logged in/out logic */}
          {isPending ? (
            <div className="w-20 h-8 bg-white/10 animate-pulse rounded-xl" /> // Skeleton loading
          ) : user ? (
            <>
            <Link href={'/dashboard/recruiter'}>

              <span className="text-sm text-zinc-400">Hi, {user.name.split(" ")[0]}. !</span>
            </Link>
              <Button 
                onClick={handleSignOut} 
                variant="flat" 
                color="danger" 
                className="rounded-xl px-4"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/auth/signin"
                className="text-purple-400 hover:text-purple-300 text-sm font-medium"
              >
                Sign In
              </Link>
              <Button className="bg-white text-black rounded-xl px-5">
                Get Started
              </Button>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white ml-auto focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <div className="bg-[#1a1a1a] rounded-xl p-4 flex flex-col gap-4 border border-zinc-800">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-300 py-1"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <hr className="border-zinc-800 my-1" />

            {isPending ? (
              <div className="w-full h-10 bg-white/10 animate-pulse rounded-xl" />
            ) : user ? (
              <Button 
                onClick={() => { handleSignOut(); setIsOpen(false); }} 
                variant="flat" 
                color="danger" 
                className="w-full"
              >
                Sign Out
              </Button>
            ) : (
              <>
                <Link 
                  href="/auth/signin" 
                  className="text-purple-400 text-center py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
                <Button className="bg-white text-black w-full">
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;