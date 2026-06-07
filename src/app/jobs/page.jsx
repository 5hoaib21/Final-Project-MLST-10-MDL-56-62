import JobCard from "@/components/jobs/JobCard";
import JobFilters from "@/components/jobs/JobFilters"; // ফিল্টার ইমপোর্ট করা হলো
import { getJobs } from "@/lib/api/jobs";

// Next.js সার্ভার কম্পোনেন্টে searchParams প্রপ্স সরাসরি অ্যাক্সেস করা যায়
export default async function JobPage({ searchParams }) {
  const jobs = await getJobs();

  // URL Query প্যারামিটারগুলো রিড করা হচ্ছে
  const query = await searchParams; // Next.js 15+ এর জন্য await করতে হয়, এর নিচের ভার্সন হলে সরাসরি 'searchParams.search' লিখবেন
  const searchQuery = query?.search || "";
  const selectedType = query?.type || "";
  const selectedWorkplace = query?.workplace || "all";

  // সার্ভার সাইড ফিল্টারিং লজিক
  const filteredJobs = (jobs || []).filter((job) => {
    // সার্চ কোয়েরি ফিল্টার (Title, Company Name, Category)
    const matchesSearch = searchQuery
      ? job.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.companyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.jobCategory?.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    // জব টাইপ ফিল্টার (Full-time/Part-time)
    const matchesType = selectedType ? job.jobType === selectedType : true;

    // ওয়ার্কপ্লেস ফিল্টার (Remote/On-site)
    let matchesWorkplace = true;
    if (selectedWorkplace === "remote") matchesWorkplace = job.isRemote === true;
    if (selectedWorkplace === "onsite") matchesWorkplace = job.isRemote === false;

    return matchesSearch && matchesType && matchesWorkplace;
  });

  return (
    <div className="p-8 bg-zinc-950 min-h-screen mt-30">
      
      {/* ফিল্টার প্যানেল যুক্ত করা হলো */}
      <JobFilters />

      {/* ফিল্টার হওয়া ডাটা যদি শূন্য হয় */}
      {filteredJobs.length === 0 ? (
        <div className="flex justify-center items-center h-[40vh]">
          <p className="text-zinc-500 text-lg">No jobs match your search criteria.</p>
        </div>
      ) : (
        /* ৩ কলামের রেসপনসিভ গ্রিড লেআউট */
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {filteredJobs.map((job) => (
            <JobCard 
              key={job?._id?.$oid || job?._id} 
              data={job} 
            />
          ))}
        </div>
      )}
    </div>
  );
}