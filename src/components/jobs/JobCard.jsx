import React from "react";
import { Card } from "@heroui/react";
import {
  Briefcase,
  CircleDollar,
  Calendar,
  ArrowUpRight,
} from "@gravity-ui/icons";
import Link from "next/link";

export default function JobCard({ data }) {
  console.log("data from jobs page", data);
  // Safe destructuring with fallbacks (আপনার কোড ঠিক রাখা হয়েছে)
  const {
    jobTitle,
    jobType,
    minSalary,
    maxSalary,
    currency,
    deadline,
    responsibilities,
    requirements, // ডাটা থেকে রিকোয়ারমেন্টস নিবে
    benefits, // ডাটা থেকে বেনিফিটস নিবে
    isRemote = false,
    companyName,
    companyLogo,
  } = data || {};

  // স্যালারি ফরম্যাটিং (e.g., 3200 বা 5800 থাকলে সেটিকে 3.2k–5.8k কনভার্ট করবে, ইমেজের মতো)
  const formatSalaryAmount = (amount) => {
    if (!amount) return "0";
    const num = parseInt(amount, 10);
    return num >= 1000 ? `${num / 1000}k` : amount;
  };

  const currencySymbol =
    currency === "USD" ? "$" : currency === "EUR" ? "€" : `${currency} `;

  const salaryDisplay =
    minSalary && maxSalary
      ? `${currencySymbol}${formatSalaryAmount(minSalary)}–${currencySymbol}${formatSalaryAmount(maxSalary)} / month`
      : "Salary Negotiable";

  return (
    // ইমেজের মতো পারফেক্ট ম্যাট-ডার্ক ব্যাকগ্রাউন্ড (bg-[#121214]) এবং প্যাডিং করা হয়েছে
    <Card className="w-full max-w-[440px] bg-[#121214] border border-zinc-800/50 text-zinc-100 p-6 rounded-[28px] shadow-2xl">
      {/* Card Header: Company Info & Title */}
      <Card.Header className="flex flex-col items-start gap-3.5 p-0">
        {/* কোম্পানি ব্র্যান্ডিং */}
        <div className="flex items-center gap-2.5">
          {companyLogo ? (
            <img
              src={companyLogo}
              alt={companyName}
              className="w-7 h-7 rounded-lg object-contain"
            />
          ) : (
            <div className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center font-bold text-zinc-400 text-xs">
              {companyName}
            </div>
          )}
          <span className="text-zinc-300 text-base font-medium tracking-wide">
            {companyName}
          </span>
        </div>

        {/* জব টাইটেল ও রেসপন্সিবিলিটি */}
        <div className="space-y-2 w-full">
          <Card.Title className="text-[28px] font-semibold tracking-tight text-white leading-tight">
            {jobTitle}
          </Card.Title>
          {responsibilities && (
            <Card.Description className="text-zinc-400 text-[14px] leading-relaxed line-clamp-2">
              {responsibilities}
            </Card.Description>
          )}
        </div>
      </Card.Header>

      {/* Card Content: Badges/Tags & Details */}
      <Card.Content className="flex flex-col gap-5 mt-5 p-0">
        {/* পিল/ট্যাগ সেকশন (ইমেজের মতো পাশাপাশি ফ্লিপ হবে) */}
        <div className="flex flex-wrap gap-2">
          {/* লোকেশন ও জব টাইপ */}
          <div className="inline-flex items-center gap-2 bg-zinc-800/40 text-zinc-300 px-4 py-2 rounded-full text-xs font-medium border border-zinc-800/40">
            <Briefcase className="w-3.5 h-3.5 text-purple-400" />
            <span className="capitalize">
              {isRemote ? "USA" : "On-site"} • {jobType}
            </span>
          </div>

          {/* স্যালারি ট্যাগ */}
          <div className="inline-flex items-center gap-2 bg-zinc-800/40 text-zinc-300 px-4 py-2 rounded-full text-xs font-medium border border-zinc-800/40">
            <CircleDollar className="w-3.5 h-3.5 text-purple-400" />
            <span>{salaryDisplay}</span>
          </div>

          {/* ডেডলাইন ট্যাগ */}
          {deadline && (
            <div className="inline-flex items-center gap-2 bg-zinc-800/40 text-zinc-300 px-4 py-2 rounded-full text-xs font-medium border border-zinc-800/40">
              <Calendar className="w-3.5 h-3.5 text-purple-400" />
              <span>Deadline: {deadline}</span>
            </div>
          )}
        </div>

        {/* Requirements এবং Benefits টেক্সট সেকশন (নতুন ইমেজের মতো) */}
        {(requirements || benefits) && (
          <div className="text-[13px] text-zinc-500 space-y-1.5 border-t border-zinc-800/40 pt-4 mt-1">
            {requirements && (
              <p className="line-clamp-1">
                <strong className="text-zinc-400 font-medium">
                  Requirements:
                </strong>{" "}
                {requirements}
              </p>
            )}
            {benefits && (
              <p className="line-clamp-1">
                <strong className="text-zinc-400 font-medium">Benefits:</strong>{" "}
                {benefits}
              </p>
            )}
          </div>
        )}
      </Card.Content>

      {/* Card Footer: Apply Link */}
      <Card.Footer className="flex justify-start mt-6 p-0">
        <Link
         href={`/jobs/${data?._id}`}
          className="inline-flex items-center gap-1.5 text-white hover:text-purple-400 font-semibold transition-colors duration-200 group text-[15px]"
        >
          <span>Apply Now</span>
          <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-zinc-400 group-hover:text-purple-400" />
        </Link>
      </Card.Footer>
    </Card>
  );
}
