 // Adjust path if needed
import { getApplicationsByApplicant } from '@/lib/api/applications';
import { getUserSession } from '@/lib/core/session';
import React from 'react';
import ApplicationsTable from './ApplicationsTable';

const ApplicationsPage = async () => {
    const user = await getUserSession();
    const jobs = await getApplicationsByApplicant(user?.id);
    
    return (
        <div className="min-h-screen bg-[#0d0d0d] p-8">
            <h2 className="text-xl font-bold text-white mb-6 tracking-wide">Applications</h2>
            <ApplicationsTable jobs={jobs} />
        </div>
    );
};

export default ApplicationsPage;