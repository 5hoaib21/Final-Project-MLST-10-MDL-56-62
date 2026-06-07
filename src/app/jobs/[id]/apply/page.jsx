import { gerJobById } from "@/lib/api/jobs";
import { getUserSession } from "@/lib/core/session";
import { ShieldExclamation } from "@gravity-ui/icons";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import JobApply from "./JobApply";

const ApplyPage = async ({ params }) => {
    const {id} = await params;
  const user = await getUserSession();
  
  if (!user) {
      redirect(`/auth/signin?redirect=/jobs/${id}/apply`);
    }
      // Auth Role Guard Screen
    if (user.role !== 'seeker') {
        return (
            <div className="w-full min-h-screen bg-zinc-950 flex flex-col justify-center items-center text-white p-6">
              <p>Only job seeker can apply for positions. Please sign in with a seeker account to proceed.</p>
            </div>
        );
    }

    const job = await gerJobById(id)

  return (
    <div className="mt-30">
      <h2>apply for {job.jobTitle}</h2>
      <JobApply applicant={user} job={job} />
    </div>
  );
};

export default ApplyPage;
