import { gerJobById } from "@/lib/api/jobs";
import { getUserSession } from "@/lib/core/session";
import { ShieldExclamation, CircleExclamation, ChevronRight, Thunderbolt } from "@gravity-ui/icons";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import JobApply from "./JobApply";
import { getApplicationsByApplicant } from "@/lib/api/applications";
import { Card, Button } from "@heroui/react";
import { gerPlanById } from "@/lib/api/plans";

const ApplyPage = async ({ params }) => {
  const { id } = await params;
  const user = await getUserSession();

  if (!user) {
    redirect(`/auth/signin?redirect=/jobs/${id}/apply`);
  }

  // 1. Auth Role Guard Screen Styling (Button text string serialization serialization fix)
  if (user.role !== "seeker") {
    return (
      <main className="w-full min-h-screen bg-zinc-950 flex flex-col justify-center items-center text-zinc-100 p-6">
        <Card className="max-w-md w-full bg-zinc-900 border border-zinc-800 p-8 text-center flex flex-col items-center gap-4 rounded-2xl shadow-xl">
          <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-2">
            <ShieldExclamation size={28} />
          </div>
          <h1 className="text-xl font-bold text-white">Access Denied</h1>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Only verified job seekers can apply for positions. Please sign in with a candidate/seeker account to proceed.
          </p>
          <Button 
            as="a" // 💡 Fixed: Function pass na kore pure anchor element tag dewa holo
            href="/auth/signin" 
            color="warning" 
            variant="flat"
            className="w-full mt-2 font-medium rounded-xl text-center flex items-center justify-center"
          >
            Switch Account
          </Button>
        </Card>
      </main>
    );
  }

  const applications = await getApplicationsByApplicant(user.id);
  const job = await gerJobById(id);


  const plan = await gerPlanById(user?.plan || 'seeker_free')
  console.log('user plan info:', plan);
  


  const applicationsCount = applications.length;
  const maxLimit = plan.maxApplicationsPerMonth;
  const isLimitReached = applicationsCount >= maxLimit;

  return (
    <main className="w-full min-h-screen bg-zinc-950 text-zinc-100 pt-32 pb-16 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* 2. Usage & Limit Tracker Card */}
        <Card className={`w-full border p-6 rounded-2xl backdrop-blur-md transition-all ${
          isLimitReached 
            ? "bg-red-950/20 border-red-900/50" 
            : "bg-zinc-900/40 border-zinc-800"
        }`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  {plan.name} Plan Usage
                </span>
                {isLimitReached && (
                  <span className="flex items-center gap-1 text-xs text-red-400 font-medium animate-pulse">
                    <CircleExclamation size={12} /> Limit Reached
                  </span>
                )}
              </div>
              
              <h2 className="text-lg font-bold text-white">
                You have applied so far <span className={isLimitReached ? "text-red-400" : "text-purple-400"}>{applicationsCount}</span> out of <span className="text-zinc-300">{maxLimit}</span> applications this month.
              </h2>
              
              <p className="text-xs sm:text-sm text-zinc-400">
                Purchase a premium membership to unlock unlimited application tracking pipelines.
              </p>
            </div>

            {/* Action Routing Button (Fixed: Passing "a" tag instead of Link module reference) */}
            <Link href={'/plans'}>
            <Button
              as="a" // 💡 Fixed: Component reference serialize dynamic compilation bypass
             
              color={isLimitReached ? "primary" : "default"}
              variant={isLimitReached ? "solid" : "bordered"}
              className={`rounded-xl shrink-0 text-xs font-semibold flex items-center justify-center ${
                isLimitReached 
                  ? "bg-purple-600 hover:bg-purple-500 text-white" 
                  : "border-zinc-800 text-zinc-300 hover:bg-zinc-800"
              }`}
              endContent={<ChevronRight size={14} />}
            >
              <Thunderbolt size={14} className="text-amber-400" />
              Upgrade Plan
            </Button>
            </Link>
          </div>

          {/* Micro Progress Bar Component */}
          <div className="w-full bg-zinc-950 border border-zinc-800/60 h-2 mt-5 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 rounded-full ${
                isLimitReached ? "bg-red-500" : "bg-gradient-to-r from-purple-500 to-pink-500"
              }`}
              style={{ width: `${Math.min((applicationsCount / maxLimit) * 100, 100)}%` }}
            />
          </div>
        </Card>

        {/* 3. Condition Based Job Application Form Setup */}
        {applicationsCount < maxLimit ? (
          <div className="animate-fade-in">
            <JobApply applicant={user} job={job} />
          </div>
        ) : (
          <Card className="w-full bg-zinc-900/10 border border-dashed border-red-900/30 p-8 text-center rounded-2xl">
            <p className="text-zinc-500 text-sm">
              Monthly submission limit crossed. Please renew or upgrade your profile tier configuration grid above to unlock the form.
            </p>
          </Card>
        )}

      </div>
    </main>
  );
};

export default ApplyPage;