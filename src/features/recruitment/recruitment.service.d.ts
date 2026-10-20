import type { RecruitmentRepository } from "./recruitment.repository.js";
import type { JobApplicationStatus } from "@prisma/client";
export declare class Recruitmentservice {
    private readonly repository;
    constructor(repository: RecruitmentRepository);
    getAllJobs(): Promise<({
        applications: {
            id: number;
            jobId: number;
            name: string;
            email: string;
            phone: string;
            address: string | null;
            experience: number | null;
            skills: string | null;
            currentCompany: string | null;
            noticePeriod: number | null;
            ctc: import("@prisma/client-runtime-utils").Decimal | null;
            expectedCtc: import("@prisma/client-runtime-utils").Decimal | null;
            resumeLink: string | null;
            linkedinUrl: string | null;
            status: import("@prisma/client").$Enums.JobApplicationStatus;
            createdAt: Date;
            updatedAt: Date;
        }[];
        department: {
            id: number;
            departmentName: string;
            departmentCode: number;
            departmentUrl: string | null;
            managerId: string | null;
            createdAt: Date;
            updatedAt: Date;
        } | null;
    } & {
        id: number;
        jobTitle: string;
        jobDescription: string | null;
        departmentId: number | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    createjobposting(jobdata: any): Promise<{
        id: number;
        jobTitle: string;
        jobDescription: string | null;
        departmentId: number | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateJobPosting(id: Number, jobdata: any): Promise<{
        id: number;
        jobTitle: string;
        jobDescription: string | null;
        departmentId: number | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deletejobposting(id: number): Promise<{
        id: number;
        jobTitle: string;
        jobDescription: string | null;
        departmentId: number | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getJobApplicationbyJobId(jobId: number): Promise<{
        id: number;
        jobId: number;
        name: string;
        email: string;
        phone: string;
        address: string | null;
        experience: number | null;
        skills: string | null;
        currentCompany: string | null;
        noticePeriod: number | null;
        ctc: import("@prisma/client-runtime-utils").Decimal | null;
        expectedCtc: import("@prisma/client-runtime-utils").Decimal | null;
        resumeLink: string | null;
        linkedinUrl: string | null;
        status: import("@prisma/client").$Enums.JobApplicationStatus;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    createcadidate(data: any): Promise<{
        id: number;
        jobId: number;
        name: string;
        email: string;
        phone: string;
        address: string | null;
        experience: number | null;
        skills: string | null;
        currentCompany: string | null;
        noticePeriod: number | null;
        ctc: import("@prisma/client-runtime-utils").Decimal | null;
        expectedCtc: import("@prisma/client-runtime-utils").Decimal | null;
        resumeLink: string | null;
        linkedinUrl: string | null;
        status: import("@prisma/client").$Enums.JobApplicationStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updatecandidatestatus(status: JobApplicationStatus, applicationId: number): Promise<{
        id: number;
        jobId: number;
        name: string;
        email: string;
        phone: string;
        address: string | null;
        experience: number | null;
        skills: string | null;
        currentCompany: string | null;
        noticePeriod: number | null;
        ctc: import("@prisma/client-runtime-utils").Decimal | null;
        expectedCtc: import("@prisma/client-runtime-utils").Decimal | null;
        resumeLink: string | null;
        linkedinUrl: string | null;
        status: import("@prisma/client").$Enums.JobApplicationStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
//# sourceMappingURL=recruitment.service.d.ts.map