import Link from "next/link";
import { Facebook, Linkedin, BrandPinterest } from "@gravity-ui/icons";
import { FaLinkedin, FaPinterest } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-14">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-fuchsia-500 flex items-center justify-center font-bold">
                H
              </div>
              <div className="leading-5">
                <h2 className="text-xl font-bold">Hiring</h2>
                <h2 className="text-xl font-bold">Platform</h2>
              </div>
            </Link>

            <p className="mt-7 max-w-xs text-gray-400 leading-7">
              The AI-native career platform. Built for people who take their
              work seriously.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-purple-500 font-semibold mb-6">Product</h3>
            <ul className="space-y-4 text-gray-400">
              <li><Link href="/jobs" className="hover:text-white">Job discovery</Link></li>
              <li><Link href="/ai" className="hover:text-white">Worker AI</Link></li>
              <li><Link href="/companies" className="hover:text-white">Companies</Link></li>
              <li><Link href="/salary" className="hover:text-white">Salary data</Link></li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-purple-500 font-semibold mb-6">Navigations</h3>
            <ul className="space-y-4 text-gray-400">
              <li><Link href="/help" className="hover:text-white">Help center</Link></li>
              <li><Link href="/career" className="hover:text-white">Career library</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-purple-500 font-semibold mb-6">Resources</h3>
            <ul className="space-y-4 text-gray-400">
              <li><Link href="/brand" className="hover:text-white">Brand Guideline</Link></li>
              <li><Link href="/news" className="hover:text-white">Newsroom</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Social Icons */}
          <div className="flex gap-3">
            <Link
              href="#"
              className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-purple-600 transition"
            >
              <FaSquareFacebook /> 
            </Link>

            <Link
              href="#"
              className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center"
            >
              <FaPinterest width={18} height={18} />
            </Link>

            <Link
              href="#"
              className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-purple-600 transition"
            >
              <FaLinkedin />
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-gray-500 text-sm">
            Copyright 2026 — Hiring Platform
          </p>

          {/* Links */}
          <div className="flex gap-2 text-gray-500 text-sm">
            <Link href="/terms" className="hover:text-white">
              Terms & Policy
            </Link>
            <span>-</span>
            <Link href="/privacy" className="hover:text-white">
              Privacy Guideline
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;