import { getCompanyJobs } from "@/lib/api/jobs";
import React from "react";

const RecruiterJobsPage = async () => {
  const companyId = 'company_123'; //todo: 
  const jobs = await getCompanyJobs(companyId);
  console.log(jobs, 'jobs from recruiter page');
  return (
    <div>
      <h1>Recruiter/company&apos;s manage All Jobs!</h1>
    </div>
  );
};

export default RecruiterJobsPage;
