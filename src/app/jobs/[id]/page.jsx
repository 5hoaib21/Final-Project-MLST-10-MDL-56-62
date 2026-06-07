import { gerJobById } from '@/lib/api/jobs';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Card } from '@heroui/react';
import { 
    Briefcase, 
    Clock, 
    Calendar,
    CircleCheck, 
    ArrowLeft 
} from '@gravity-ui/icons';

import { FaCoins } from 'react-icons/fa';

const JobDetailsPage = async ({ params }) => {
  const { id } = await params;
  const job = await gerJobById(id);

  if (!job) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        <p className="text-zinc-400">Job details data load kora jayni.</p>
      </div>
    );
  }

  // Comma strings ke lists-e convert korar utility framework handles
  const splitData = (str) => str ? str.split(',').map(item => item.trim()) : [];
  
  const responsibilityList = splitData(job.responsibilities);
  const requirementList = splitData(job.requirements);
  const benefitList = splitData(job.benefits);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pt-32 pb-16 px-4">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        
        {/* BACK TO BROWSE ACTION CONTROL */}
        <Link 
          href="/jobs" 
          className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition w-fit group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Browse Jobs
        </Link>

        {/* HERO CARD CONTAINER CONTAINER */}
        <Card className="w-full bg-zinc-900/40 border border-zinc-800 p-6 sm:p-8 backdrop-blur-md rounded-2xl shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-zinc-800">
            
            {/* Left: Company Logo and Titles Metadata */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-zinc-800 border border-zinc-700 overflow-hidden flex items-center justify-center relative p-2">
                <Image
                  src={job.companyLogo || "https://i.ibb.co.com/qLc8nDHZ/spotify.png"}
                  alt={`${job.companyName} Logo`}
                  width={64}
                  height={64}
                  className="object-contain"
                  unoptimized // Universal support fallback handling 
                />
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">{job.jobTitle}</h1>
                <p className="text-md font-medium text-purple-400">{job.companyName}</p>
              </div>
            </div>

            {/* Right: Apply Primary Control Target */}
            <Button 
              color="primary"
              className="w-full sm:w-auto font-semibold rounded-xl text-sm h-12 px-8 shadow-lg shadow-purple-500/10"
            >
              Apply Now
            </Button>
          </div>

          {/* SYSTEM TAG PILLS BADGES INFO */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
            <div className="flex items-center gap-3 bg-zinc-900/80 border border-zinc-800/80 p-3 rounded-xl">
              <Briefcase className="text-purple-400" size={18} />
              <div className="flex flex-col">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Category</span>
                <span className="text-sm font-medium text-zinc-200 capitalize">{job.jobCategory}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-zinc-900/80 border border-zinc-800/80 p-3 rounded-xl">
              <Clock className="text-pink-400" size={18} />
              <div className="flex flex-col">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Job Type</span>
                <span className="text-sm font-medium text-zinc-200 capitalize">
                  {job.jobType} {job.isRemote && '(Remote)'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-zinc-900/80 border border-zinc-800/80 p-3 rounded-xl">
              <FaCoins className="text-emerald-400" size={18} />
              <div className="flex flex-col">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Salary Range</span>
                <span className="text-sm font-medium text-zinc-200">
                  {job.minSalary}-{job.maxSalary} {job.currency}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-zinc-900/80 border border-zinc-800/80 p-3 rounded-xl">
              <Calendar className="text-amber-400" size={18} />
              <div className="flex flex-col">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Deadline</span>
                <span className="text-sm font-medium text-zinc-200">{job.deadline}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* DETAILS STRUCTURAL CORE MARKUP GRID */}
        <div className="grid grid-cols-1 gap-6">
          
          {/* Section: Requirements */}
          <Card className="bg-zinc-900/20 border border-zinc-800/60 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-purple-500 rounded-full inline-block" />
              Requirements
            </h3>
            <ul className="flex flex-col gap-3">
              {requirementList.map((req, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-zinc-300 text-sm leading-relaxed">
                  <CircleCheck className="text-purple-400 mt-0.5 shrink-0" size={16} />
                  {req}
                </li>
              ))}
            </ul>
          </Card>

          {/* Section: Responsibilities */}
          <Card className="bg-zinc-900/20 border border-zinc-800/60 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-pink-500 rounded-full inline-block" />
              Key Responsibilities
            </h3>
            <ul className="flex flex-col gap-3">
              {responsibilityList.map((res, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-zinc-300 text-sm leading-relaxed">
                  <CircleCheck className="text-pink-400 mt-0.5 shrink-0" size={16} />
                  {res}
                </li>
              ))}
            </ul>
          </Card>

          {/* Section: Benefits */}
          <Card className="bg-zinc-900/20 border border-zinc-800/60 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-emerald-500 rounded-full inline-block" />
              Perks & Benefits
            </h3>
            <ul className="flex flex-col gap-3">
              {benefitList.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-zinc-300 text-sm leading-relaxed">
                  <CircleCheck className="text-emerald-400 mt-0.5 shrink-0" size={16} />
                  {benefit}
                </li>
              ))}
            </ul>
          </Card>

        </div>

      </div>
    </div>
  );
};

export default JobDetailsPage;