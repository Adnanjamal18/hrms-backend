import type { RecruitmentRepository } from "./recruitment.repository.js";


export class Recruirmentservice{
    constructor(private readonly repository: RecruitmentRepository){}
    
    async createJobPosting(jobData:any){
        if(jobData.salary)
    }

}