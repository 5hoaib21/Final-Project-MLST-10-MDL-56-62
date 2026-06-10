import React from 'react';

import { getCompanies } from '@/lib/api/companies';
import CompanyApprovalTable from '@/components/dashboard/CompanyApprovalTable';

const AdminCompaniesPage = async () => {
    const companies = await getCompanies();
    // console.log('companies', companies);

    // Handler server action or route invocation logic triggers
    // const handleApprove = async (id) => {
    
    //     // Your logic to update status to "Approved" in the DB
    //     console.log("Approved company ID:", id);
    // };

    // const handleReject = async (id) => {
        
    //     // Your logic to update status to "Rejected" in the DB
    //     console.log("Rejected company ID:", id);
    // };

    return (
        <div className="min-h-screen bg-[#0d0d0d] p-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white tracking-wide">Company Reviews</h2>
                <span className="text-sm text-zinc-400 bg-neutral-900 px-3 py-1 rounded-md border border-neutral-800">
                    Total: {companies.length}
                </span>
            </div>
            
            <CompanyApprovalTable 
                companies={companies} 
               
            />
        </div>
    );
};

export default AdminCompaniesPage;