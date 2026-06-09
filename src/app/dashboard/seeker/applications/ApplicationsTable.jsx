'use client';

import React from 'react';
import { Table, Chip } from '@heroui/react';
// Using Gravity UI Icons as specified in your setup
import { Code, LayoutHeader, Database, Cloud, LogoOsi } from '@gravity-ui/icons';

const ApplicationsTable = ({ jobs = [] }) => {
  
  // Helper to get matching Gravity UI icon based on job title
  const getJobIcon = (title = '') => {
    const t = title.toLowerCase();
    if (t.includes('frontend') || t.includes('web') || t.includes('software')) {
      return <Code className="w-5 h-5 text-zinc-400" />;
    }
    if (t.includes('design') || t.includes('product')) {
      return <LayoutHeader className="w-5 h-5 text-zinc-400" />;
    }
    if (t.includes('data') || t.includes('science')) {
      return <Database className="w-5 h-5 text-zinc-400" />;
    }
    if (t.includes('cloud') || t.includes('architect')) {
      return <Cloud className="w-5 h-5 text-zinc-400" />;
    }
    if (t.includes('ai') || t.includes('machine') || t.includes('research')) {
      return <LogoOsi className="w-5 h-5 text-zinc-400" />;
    }
    return <Code className="w-5 h-5 text-zinc-400" />;
  };

  // Helper to cleanly convert MongoDB $date into dynamic relative text
  const formatRelativeTime = (dateInput) => {
    if (!dateInput) return 'N/A';
    
    // Safely extract the ISO string from MongoDB's {"$date": "..."} format or raw string
    const dateStr = typeof dateInput === 'object' && dateInput.$date ? dateInput.$date : dateInput;
    
    const created = new Date(dateStr);
    const now = new Date();
    
    const diffMs = now - created;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60); //  Fixed conversion (60 minutes in an hour)
    const diffDays = Math.floor(diffHours / 24); //  Fixed conversion (24 hours in a day)

    if (diffMins < 60) {
      return `${diffMins <= 0 ? 1 : diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    }
    if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    }
    if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    }
    
    const diffWeeks = Math.floor(diffDays / 7);
    return `${diffWeeks} week${diffWeeks !== 1 ? 's' : ''} ago`;
  };

  // Maps custom statuses to exact styled border-chips matching your screenshot
  const getStatusChip = (status = 'Applied') => {
    const normalized = status.toLowerCase();
    switch (normalized) {
      case 'applied':
        return <Chip className="border border-zinc-600 bg-transparent text-zinc-300 rounded-full" size="sm">Applied</Chip>;
      case 'review':
        return <Chip className="border border-amber-500/70 bg-transparent text-amber-500 rounded-full" size="sm">Review</Chip>;
      case 'shortlisted':
        return <Chip className="border border-emerald-500/70 bg-transparent text-emerald-400 rounded-full" size="sm">Shortlisted</Chip>;
      case 'rejected':
        return <Chip className="border border-red-500/60 bg-transparent text-red-400 rounded-full" size="sm">Rejected</Chip>;
      case 'offered':
        return <Chip className="border border-zinc-400 bg-transparent text-white rounded-full" size="sm">Offered</Chip>;
      default:
        return <Chip className="border border-zinc-600 bg-transparent text-zinc-300 rounded-full" size="sm">{status}</Chip>;
    }
  };

  return (
    <div className="w-full bg-[#121212] p-6 rounded-xl border border-neutral-800 text-white">
      <Table className="w-full text-left border-collapse bg-transparent">
        <Table.ScrollContainer>
          <Table.Content aria-label="Job Applications Status Table">
            <Table.Header>
              <Table.Column className="pb-4 text-zinc-400 font-medium bg-transparent text-sm border-b border-neutral-800">Job Title</Table.Column>
              <Table.Column className="pb-4 text-zinc-400 font-medium bg-transparent text-sm border-b border-neutral-800">Company</Table.Column>
              <Table.Column className="pb-4 text-zinc-400 font-medium bg-transparent text-sm border-b border-neutral-800">Applied</Table.Column>
              <Table.Column className="pb-4 text-zinc-400 font-medium bg-transparent text-sm border-b border-neutral-800">Status</Table.Column>
              <Table.Column className="pb-4 text-zinc-400 font-medium bg-transparent text-sm border-b border-neutral-800 text-right">Action</Table.Column>
            </Table.Header>
            <Table.Body>
              {jobs.map((job) => (
                <Table.Row key={job._id?.$oid || job.jobId} className="border-b border-neutral-800/50 hover:bg-neutral-900/40 transition-colors">
                  {/* Job Title Cell */}
                  <Table.Cell className="py-4 align-middle">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center border border-neutral-700/60">
                        {getJobIcon(job.jobTitle)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-zinc-200 font-semibold tracking-wide text-sm">{job.jobTitle}</span>
                        <span className="text-zinc-500 text-xs mt-0.5">
                          {job.jobType || 'Full-time'} • {job.workplaceType || 'Remote'}
                        </span>
                      </div>
                    </div>
                  </Table.Cell>
                  
                  {/* Company Cell */}
                  <Table.Cell className="py-4 align-middle text-zinc-300 text-sm">
                    {job.companyName}
                  </Table.Cell>
                  
                  {/* Applied Relative Time Cell (Now purely dynamic!) */}
                  <Table.Cell className="py-4 align-middle text-zinc-400 text-sm">
                    {formatRelativeTime(job.createdAt)}
                  </Table.Cell>
                  
                  {/* Status Cell */}
                  <Table.Cell className="py-4 align-middle">
                    {getStatusChip(job.status || 'Applied')}
                  </Table.Cell>
                  
                  {/* Action Link Details Cell */}
                  <Table.Cell className="py-4 align-middle text-right text-zinc-300 text-sm font-medium">
                    <a 
                      href={job.resumeLink || '#'} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-white transition-colors cursor-pointer"
                    >
                      Details
                    </a>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
};

export default ApplicationsTable;