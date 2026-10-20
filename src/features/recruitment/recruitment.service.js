import { error } from "node:console";
export class Recruitmentservice {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async getAllJobs() {
        return await this.repository.getAllJobs();
    }
    //All business Logic (Brain working)
    async createjobposting(jobdata) {
        if (jobdata.description == null) {
            throw new Error("You cannot pay someone a negative salary");
        }
        if (jobdata.departmentid == null) {
            throw new Error("Please provide a deparment id");
        }
        if (jobdata.title == null) {
            throw new Error("Please Provide a title");
        }
        //Now Call Chef To To Save The Data
        const newjob = await this.repository.createjobposting({
            title: jobdata.title,
            departmentid: jobdata.departmentid,
            description: jobdata.description,
        });
        return newjob;
        //Return it back to the controller
    }
    async updateJobPosting(id, jobdata) {
        if (!id) {
            throw new Error("invalid user id");
        }
        if (jobdata.title == null) {
            throw new Error("write proper title for update");
        }
        const newjobupdate = await this.repository.updatejobposting(jobdata.id, {
            title: jobdata.title,
            description: jobdata.description,
            departmentId: jobdata.departmentid
        });
        return newjobupdate;
    }
    async deletejobposting(id) {
        if (!id) {
            throw new Error("Invalid job ID");
        }
        const deletejob = await this.repository.deletejobposting(id);
        return deletejob;
    }
    async getJobApplicationbyJobId(jobId) {
        if (!jobId) {
            throw new Error("Invalid Id");
        }
        const candidates = await this.repository.getJobApplicationbyJobId(jobId);
        return candidates;
    }
    async createcadidate(data) {
        if (data.email == undefined) {
            throw new Error("email is expected");
        }
        if (data.phone == undefined) {
            throw new Error("phone no is expected");
        }
        if (data.name == undefined) {
            throw new Error("name is expected");
        }
        if (data.jobId == undefined) {
            throw new Error("id is expected.You are not authorized");
        }
        const candidate = await this.repository.createcadidate(data);
        return candidate;
    }
    async updatecandidatestatus(status, applicationId) {
        if (applicationId == undefined) {
            throw new Error("you are not authorized");
        }
        if (status == undefined) {
            throw new Error("status is not defined ");
        }
        const candidate = await this.repository.updatecandidatestatus(status, applicationId);
        return candidate;
    }
}
//# sourceMappingURL=recruitment.service.js.map