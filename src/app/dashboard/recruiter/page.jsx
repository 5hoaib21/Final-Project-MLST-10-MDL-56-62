"use client";
import { useSession } from "@/lib/auth-client";
import React from "react";

// Example Icons
import { FileText, Persons,Thunderbolt,  CircleCheck } from "@gravity-ui/icons";
import { StatsGrid } from "@/components/dashboard/StatsGrid";

const RecruiterDashboardHomePage = () => {
  const { data: session, isPending } = useSession();
  if (isPending) {
    return <div>Loading...</div>;
  }


  const recruiterStats = [
    { title: 'Total Job Posts', value: 48, icon: FileText },
    { title: 'Total Applicants', value: 1284, icon: Persons },
    { title: 'Active Jobs', value: 18, icon: Thunderbolt },
    { title: 'Jobs Closed', value: 32, icon: CircleCheck },
  ];


  const user = session?.user;
  console.log(
    "session data in recruiterDashboardHome page: ",
    session,
    "is pending:",
    isPending,
  );
  return (
    <div className="">
      <h1 className="text-2xl font-bold">
        Welcome back, <span className="text-blue-600">{user?.name}.!</span>
      </h1>
      <StatsGrid stats={recruiterStats} />
    </div>
  );
};

export default RecruiterDashboardHomePage;
