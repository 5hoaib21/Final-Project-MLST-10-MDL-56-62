"use client";

import React from "react";
import { Table, Chip } from "@heroui/react";
import { updateCompany } from "@/lib/actions/companies";
import toast from "react-hot-toast";

const CompanyApprovalTable = ({ companies = [] }) => {
  // console.log('companies', companies);
  // Dynamic status indicators with bullet styles

  const onApprove = async (id) => {
    const result = await updateCompany(id, {status: 'Approved'})
    if(result.modifiedCount){
      toast.success(`Approved company ID: ${companies?.name}`);
    }
  }

  const onReject = async (id) => {
    const result = await updateCompany(id, {status: 'Rejected'})
    if(result.modifiedCount){
      toast.success(`Approved company ID: ${companies?.name}`)
    }
  }

  const renderStatus = (status = "Pending") => {
    const s = status.toLowerCase();
    if (s === "approved") {
      return (
        <div className="flex items-center gap-2 text-emerald-500 font-medium text-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          Approved
        </div>
      );
    }
    if (s === "rejected") {
      return (
        <div className="flex items-center gap-2 text-red-500 font-medium text-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
          Rejected
        </div>
      );
    }
    return (
      <div className="flex items-center gap-2 text-amber-500 font-medium text-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
        Pending
      </div>
    );
  };

  // Convert $date format safely
  const formatDate = (dateInput) => {
    if (!dateInput) return "N/A";
    const dateStr =
      typeof dateInput === "object" && dateInput.$date
        ? dateInput.$date
        : dateInput;
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  const getInitials = (name = "") => {
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <div className="w-full bg-[#121212] p-6 rounded-xl border border-neutral-800 text-white">
      <Table className="w-full text-left border-collapse bg-transparent">
        <Table.ScrollContainer>
          <Table.Content aria-label="Company Approvals Review Admin Management Board">
            <Table.Header>
              <Table.Column
                isRowHeader
                className="pb-4 text-zinc-400 font-medium bg-transparent text-sm border-b border-neutral-800"
              >
                Company Name
              </Table.Column>
              <Table.Column className="pb-4 text-zinc-400 font-medium bg-transparent text-sm border-b border-neutral-800">
                Recruiter Email
              </Table.Column>
              <Table.Column className="pb-4 text-zinc-400 font-medium bg-transparent text-sm border-b border-neutral-800">
                Industry
              </Table.Column>
              <Table.Column className="pb-4 text-zinc-400 font-medium bg-transparent text-sm border-b border-neutral-800">
                Jobs Count
              </Table.Column>
              <Table.Column className="pb-4 text-zinc-400 font-medium bg-transparent text-sm border-b border-neutral-800">
                Status
              </Table.Column>
              <Table.Column className="pb-4 text-zinc-400 font-medium bg-transparent text-sm border-b border-neutral-800">
                Date Submitted
              </Table.Column>
              <Table.Column className="pb-4 text-zinc-400 font-medium bg-transparent text-sm border-b border-neutral-800 text-right">
                Actions
              </Table.Column>
            </Table.Header>

            {/* Standard Declarative Mapping to completely bypass Hero UI Key Parsing failures */}
            {/* 🚀 Dynamic key collision completely bypass korar jonno index cascade structure */}
            <Table.Body>
              {companies.map((company, index) => {
                const currentStatus =
                  company.status?.toLowerCase() || "pending";

                //  FIX: ID and Loop Index string string connect kore dilam.
                // Ete data duplicate asleও key collision unique row identification thakbe absolute 100%!
                const rawId =
                  company._id?.$oid || company.recruiterId || "comp";
                const safeRowKey = `${rawId}-${index}`;

                return (
                  <Table.Row
                    key={safeRowKey}
                    className="border-b border-neutral-800/40 hover:bg-neutral-900/30 transition-colors"
                  >
                    <Table.Cell className="py-4 align-middle">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-zinc-800 text-zinc-300 flex items-center justify-center font-bold text-xs tracking-wider uppercase border border-neutral-700/50 overflow-hidden">
                          {company.logo && company.logo.startsWith("http") ? (
                            <img
                              src={company.logo}
                              alt={company.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            getInitials(company.name)
                          )}
                        </div>
                        <span className="text-zinc-200 font-medium text-sm">
                          {company.name || "Anonymous Corp"}
                        </span>
                      </div>
                    </Table.Cell>

                    <Table.Cell className="py-4 align-middle text-zinc-400 text-sm">
                      {company.recruiterEmail || "recruiter@hireloop.io"}
                    </Table.Cell>

                    <Table.Cell className="py-4 align-middle">
                      <Chip
                        className="bg-zinc-800/40 text-zinc-400 text-xs border border-zinc-700/40 capitalize px-2 py-0.5 rounded-full"
                        size="sm"
                      >
                        {company.industry || "General"}
                      </Chip>
                    </Table.Cell>
                    <Table.Cell className="py-4 align-middle">
                      <Chip
                        className="bg-zinc-800/40 text-zinc-400 text-xs border border-zinc-700/40 capitalize px-2 py-0.5 rounded-full"
                        size="sm"
                      >
                        {company.jobCount || "N/A"}
                      </Chip>
                    </Table.Cell>

                    <Table.Cell className="py-4 align-middle">
                      {renderStatus(company.status)}
                    </Table.Cell>

                    <Table.Cell className="py-4 align-middle text-zinc-400 text-sm">
                      {formatDate(company.createdAt)}
                    </Table.Cell>

                    <Table.Cell className="py-4 align-middle text-right">
                      <div className="flex items-center justify-end gap-2">
                        {currentStatus !== "approved" && (
                          <button
                            onClick={() =>
                              onApprove(company._id)
                            }
                            className="bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-500 border border-emerald-900/50 text-xs font-semibold px-3 py-1.5 rounded transition-all active:scale-[0.98]"
                          >
                            Approve
                          </button>
                        )}

                        {currentStatus !== "rejected" && (
                          <button
                            onClick={() =>
                              onReject(company._id)
                            }
                            className="bg-red-950/30 hover:bg-red-900/50 text-red-400 border border-red-950/40 text-xs font-semibold px-3 py-1.5 rounded transition-all active:scale-[0.98]"
                          >
                            Reject
                          </button>
                        )}
                      </div>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
};

export default CompanyApprovalTable;
