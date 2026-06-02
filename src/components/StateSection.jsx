"use client";

import { Card } from "@heroui/react";
import { FaBriefcase, FaBuilding, FaUsers, FaStar } from "react-icons/fa";
import { motion } from "motion/react"

const stats = [
  { icon: <FaBriefcase />, value: "50K", label: "Active Jobs" },
  { icon: <FaBuilding />, value: "12K", label: "Companies" },
  { icon: <FaUsers />, value: "2M", label: "Job Seekers" },
  { icon: <FaStar />, value: "97%", label: "Satisfaction Rate" },
];

const StateSection = () => {
  return (
    <section className="relative min-h-[520px] overflow-hidden bg-black py-24 text-white">
      {/* Background Globe */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90"
        style={{
          backgroundImage: "url('/images/globe.png')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Purple Glow */}
      <div className="absolute left-1/2 top-[25%] h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-purple-600/30 blur-[140px]" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-10 text-center">
        <h2 className="mb-12 text-2xl font-medium leading-relaxed text-gray-200 md:text-3xl">
          Assisting over{" "}
          <span className="font-semibold text-white">
            15,000 job seekers
          </span>
          <br />
          find their dream positions.
        </h2>
        {/* <motion.p animate={{rotate: -45}}>Remote Jobs</motion.p>
         <motion.p initial={{scale: 0}} animate={{scale: 1}}>Remote Jobs</motion.p> */}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <Card
              key={item.label}
              className="group min-h-[175px] rounded-xl border border-white/10 bg-[#121212]/90 p-7 text-left backdrop-blur-md transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-[1.03] hover:shadow-[0_20px_60px_rgba(168,85,247,0.25)]"
            >
              <div className="text-lg text-gray-300 transition-all duration-300 group-hover:scale-110 group-hover:text-purple-400">
                {item.icon}
              </div>

              <div className="mt-12">
                <h3 className="text-4xl font-semibold tracking-tight text-white transition-all duration-300 group-hover:text-purple-300">
                  {item.value}
                </h3>
                <p className="mt-3 text-sm text-gray-400">{item.label}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StateSection;