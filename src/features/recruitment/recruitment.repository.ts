import { PrismaClient } from "@prisma/client";
export class RecruitmentRepository {
    constructor (private readonly prisma:PrismaClient ){}

    async createjobposting(data:{
     title: string , description: string , salary:number
    }) {

    return await this.prisma.job.create({
        data:{
            jobTitle:data.title,
            jobDescription:data.description,
            
        }
    })

    }
}