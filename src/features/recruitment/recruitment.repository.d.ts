import { JobApplicationStatus, PrismaClient } from "@prisma/client";
export declare class RecruitmentRepository {
    private readonly prisma;
    constructor(prisma: PrismaClient);
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
    createjobposting(data: {
        title: string;
        description: string;
        departmentid: number;
    }): Promise<{
        id: number;
        jobTitle: string;
        jobDescription: string | null;
        departmentId: number | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updatejobposting(id: number, data: {
        title?: string;
        description?: string;
        departmentId?: number;
    }): Promise<{
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
    createcadidate(data: {
        name: string;
        email: string;
        phone: string;
        address: string;
        experience: number;
        skills: string;
        currentCompany: string;
        noticePeriod: number;
        ctc: number;
        expectedCtc: number;
        resumeLink: string;
        jobId: number;
        status: string;
    }): Promise<{
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
//# sourceMappingURL=recruitment.repository.d.ts.map