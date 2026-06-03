import { getCompanyJobs } from "@/lib/api/jobs";
import React from "react";
import { Chip, Table, Button, Tooltip } from "@heroui/react";
import { Eye, Pencil, TrashBin, Globe } from "@gravity-ui/icons";

const RecruiterJobsPage = async () => {
  const companyId = 'company_123'; //todo: dynamic analytics or session 
  const jobs = await getCompanyJobs(companyId);

  // স্ট্যাটাস চিপের কালার নির্ধারণ করার ফাংশন
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "success";
      case "inactive":
        return "danger";
      default:
        return "warning";
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0e] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-[#121214] border border-zinc-900 rounded-xl p-6 shadow-2xl">
        
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">Manage All Jobs</h1>
          <p className="text-zinc-400 text-sm mt-1">
            Monitor, edit, or remove your company&apos;s posted jobs inside HireLoop.
          </p>
        </div>

        {/* Hero UI Resizable Table Container */}
        <Table aria-label="Company jobs management table" className="bg-[#121214]">
          <Table.ResizableContainer>
            <Table.Content aria-label="Table with resizable columns" className="min-w-[800px]">
              
              <Table.Header>
                <Table.Column isRowHeader defaultWidth="2fr" id="jobTitle" minWidth={220}>
                  Job Title
                  <Table.ColumnResizer />
                </Table.Column>
                <Table.Column defaultWidth="1.2fr" id="salary" minWidth={140}>
                  Salary Range
                  <Table.ColumnResizer />
                </Table.Column>
                <Table.Column defaultWidth="1.2fr" id="location" minWidth={140}>
                  Location
                  <Table.ColumnResizer />
                </Table.Column>
                <Table.Column defaultWidth="1fr" id="status" minWidth={100}>
                  Status
                  <Table.ColumnResizer />
                </Table.Column>
                <Table.Column defaultWidth="1fr" id="actions" minWidth={130} className="text-center">
                  Actions
                </Table.Column>
              </Table.Header>

              <Table.Body emptyContent={"No jobs found for this company."}>
                {jobs && jobs.map((job) => {
                  // MongoDB _id হ্যান্ডেল করার নিরাপদ উপায়
                  const jobId = job._id?.$oid || job._id;
                  
                  return (
                    <Table.Row key={jobId} className="border-b border-zinc-900 hover:bg-zinc-900/40 transition-colors">
                      
                      {/* 1. Job Title Component */}
                      <Table.Cell>
                        <div className="flex flex-col gap-1">
                          <span className="font-medium text-zinc-200 text-sm">{job.jobTitle}</span>
                          <div className="flex items-center gap-2 text-xs text-zinc-500 capitalize">
                            <span>{job.jobCategory}</span>
                            <span>•</span>
                            <span className="bg-zinc-800/60 px-1.5 py-0.5 rounded text-zinc-400">{job.jobType}</span>
                          </div>
                        </div>
                      </Table.Cell>

                      {/* 2. Salary Component */}
                      <Table.Cell>
                        <span className="text-zinc-300 text-sm font-mono">
                          {job.minSalary} - {job.maxSalary} {job.currency}
                        </span>
                      </Table.Cell>

                      {/* 3. Location Component */}
                      <Table.Cell>
                        <div className="flex items-center gap-1.5 text-zinc-300 text-sm">
                          <Globe size={14} className="text-zinc-500" />
                          <span>{job.isRemote ? "Remote" : job.location}</span>
                        </div>
                      </Table.Cell>

                      {/* 4. Status Component */}
                      <Table.Cell>
                        <Chip 
                          color={getStatusColor(job.status)} 
                          size="sm" 
                          variant="soft"
                          className="capitalize font-medium"
                        >
                          {job.status || "Active"}
                        </Chip>
                      </Table.Cell>

                      {/* 5. Action Buttons Component */}
                      <Table.Cell>
                        <div className="flex items-center justify-center gap-2">
                          <Tooltip content="View Details" closeDelay={0} className="bg-zinc-800 text-xs text-white">
                            <Button 
                              isIconOnly 
                              size="sm" 
                              variant="light" 
                              className="text-zinc-400 hover:text-white hover:bg-zinc-800"
                              aria-label="View Details"
                            >
                              <Eye size={16} />
                            </Button>
                          </Tooltip>

                          <Tooltip content="Edit Job" closeDelay={0} className="bg-zinc-800 text-xs text-white">
                            <Button 
                              isIconOnly 
                              size="sm" 
                              variant="light" 
                              className="text-zinc-400 hover:text-amber-500 hover:bg-amber-950/20"
                              aria-label="Edit Job"
                            >
                              <Pencil size={16} />
                            </Button>
                          </Tooltip>

                          <Tooltip content="Delete Job" closeDelay={0} className="bg-zinc-800 text-xs text-white">
                            <Button 
                              isIconOnly 
                              size="sm" 
                              variant="light" 
                              className="text-zinc-400 hover:text-danger hover:bg-danger-950/20"
                              aria-label="Delete Job"
                            >
                              <TrashBin size={16} />
                            </Button>
                          </Tooltip>
                        </div>
                      </Table.Cell>

                    </Table.Row>
                  );
                })}
              </Table.Body>

            </Table.Content>
          </Table.ResizableContainer>
        </Table>

      </div>
    </div>
  );
};

export default RecruiterJobsPage;