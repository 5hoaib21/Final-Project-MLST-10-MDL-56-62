'use client';

import React, { useState } from 'react';
// Hero UI Components (v3.1.0 atomic anatomy)
import { Form, Button, TextField, Label, Input, Description, FieldError } from '@heroui/react';
// Gravity UI Icons for a polished look
import { ArrowRight, Link, FileText, LayoutHeaderCells } from '@gravity-ui/icons';
import { submitApplication } from '@/lib/actions/applications';
import toast from 'react-hot-toast';
// import { submitApplication } from '@/lib/actions/applications';

const JobApply = ({ job, applicant }) => {
    // Local State capturing your exact fields setup
    const [formData, setFormData] = useState({
        resumeLink: '',
        portfolioLink: '',
        additionalNotes: ''
    });

    // Form inputs state value modifier control
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Application Submission Logic wrapper matching your action layer pipelines
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Combine the pre-existing job/applicant data with your dynamic form fields data
        const submissionData = {
            jobId: job?._id,
            jobTitle: job?.jobTitle,
            companyName: job?.companyName,
            applicantId: applicant?.id || applicant?._id, // Backwards matching properties
            applicantName: applicant?.name,
            applicantEmail: applicant?.email,
            status: 'applied',
            ...formData
        };

        // console.log('Submitting Application:', submissionData);
        

        const res = await submitApplication(submissionData)

        if(res.insertedId){
            toast.success('Application submitted successfully')
            setFormData({
                resumeLink: '',
                portfolioLink: '',
                additionalNotes: '',
            })
        }

        // try {
        //     const res = await submitApplication(submissionData);
        //     if (res?.insertedId || res?.success) {
        //         alert('Application submitted successfully!');
        //         setFormData({ resumeLink: '', portfolioLink: '', additionalNotes: '' });
        //     }
        // } catch (error) {
        //     console.error("Submission error encountered:", error);
        //     alert("Application submit korar somoy kono somossa hoyeche.");
        // }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800">
            {/* Header Section */}
            <div className="mb-6">
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    Application Form
                </span>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mt-1">
                    Apply for {job?.jobTitle || 'this position'}
                </h2>
                {applicant?.name && (
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                        Applying as: <span className="font-medium text-zinc-700 dark:text-zinc-300">{applicant.name}</span> ({applicant.email})
                    </p>
                )}
            </div>

            <hr className="border-zinc-200 dark:border-zinc-800 mb-6" />

            {/* Hero UI Form wrapper */}
            <Form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">

                {/* 1. Resume Link (Required Field) */}
                <TextField isRequired name="resumeLink" className="w-full">
                    <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5 mb-1.5">
                        <FileText className="w-4 h-4 text-zinc-400" />
                        Resume Link
                    </Label>
                    <Input
                        type="url"
                        name="resumeLink"
                        placeholder="https://drive.google.com/... or dropbox.com/..."
                        value={formData.resumeLink}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
                    />
                    <Description className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                        Provide a public link to your resume (Google Drive, Notion, Dropbox, etc.)
                    </Description>
                    <FieldError className="text-xs text-red-500 mt-1" />
                </TextField>

                {/* 2. Portfolio Link (Optional Field) */}
                <TextField name="portfolioLink" className="w-full">
                    <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5 mb-1.5">
                        <Link className="w-4 h-4 text-zinc-400" />
                        Portfolio / Website <span className="text-xs text-zinc-400 font-normal">(Optional)</span>
                    </Label>
                    <Input
                        type="url"
                        name="portfolioLink"
                        placeholder="https://yourportfolio.com"
                        value={formData.portfolioLink}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
                    />
                    <Description className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                        Link to your GitHub, Behance, or personal website.
                    </Description>
                </TextField>

                {/* 3. Additional Notes / Cover Letter (Optional Field) */}
                <TextField name="additionalNotes" className="w-full">
                    <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5 mb-1.5">
                        <LayoutHeaderCells className="w-4 h-4 text-zinc-400" />
                        Short Message / Notes <span className="text-xs text-zinc-400 font-normal">(Optional)</span>
                    </Label>
                    <textarea
                        name="additionalNotes"
                        rows={4}
                        placeholder="Anything else you'd like to share with the hiring team..."
                        value={formData.additionalNotes}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition resize-none"
                    />
                </TextField>

                {/* Form Action Controls */}
                <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800/50">
                    <Button
                        type="reset"
                        onClick={() => setFormData({ resumeLink: '', portfolioLink: '', additionalNotes: '' })}
                        className="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition"
                    >
                        Clear Form
                    </Button>
                    <Button
                        type="submit"
                        className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm flex items-center gap-2 transition"
                    >
                        Submit Application
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default JobApply;