import React from 'react';
import CompanyProfile from './CompanyProfile';
import { getUserSession } from '@/lib/core/season';

const CompanyPage = async () => {

    const user = await getUserSession();
    console.log('user:' , user);

    return (
        <div>
            <CompanyProfile recruiter={user} />
        </div>
    );
};

export default CompanyPage;