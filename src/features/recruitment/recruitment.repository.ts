import { PrismaClient } from "@prisma/client";
export class RecruitmentRepository {
    constructor (private readonly prisma:PrismaClient ){}

    async createjobposting(data:{
     title: string , description: string , departmentid:number
    }) {

    return await this.prisma.job.create({
        data:{
            jobTitle:data.title,
            jobDescription:data.description,
            departmentId:data.departmentid
        }
    })

    }

    async updatejobposting(id:number , data:{title?:string,description?:string,departmentId?:number}){
     return await this.prisma.job.update({
        where:{
         id:id
        },
        data:{
            //This syntax ...(condition && { key: value }) is a famous JavaScript trick instead of using if else
            ...(data.departmentId!==undefined&&{departmentId:data.departmentId}),
            //This syntax ...(condition && { key: value }) is a famous JavaScript trick
            ...(data.description!==undefined&&{jobDescription:data.description}),
            ...(data.title!==undefined&&{jobTitle:data.title})
        }
     })
    }
}