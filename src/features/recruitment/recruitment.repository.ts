import { JobApplicationStatus, PrismaClient } from "@prisma/client";
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
//!
// JavaScript DOES NOT have a "Collection If" feature. You cannot write an if statement inside an Array or an Object. If you try,
//  your code will crash.

// So, JavaScript developers had to invent a crazy "hack" using the spread operator to fake it. This is exactly what we used in your
//  recruitment.repository.ts file!

// JavaScript / TypeScript - The "Hack":


// const data = {
//     jobTitle: "Developer",

// We can't use 'if' here. We MUST use the spread operator hack!
//     ...(hasDescription === true && { jobDescription: "Coding stuff" })
// };
// How the JavaScript Hack actually works
//! In JavaScript, the && (AND) operator does something called "Short-Circuiting". If the left side of the && is false,
//!  JavaScript stops reading immediately and returns false.
//! So if hasDescription is false, the code basically turns into this:


//! const data = {
// !    jobTitle: "Developer",
// !    ...(false) 
// };
//!

        }
     })
    }

   async deletejobposting(id:number){
    return await this.prisma.job.delete(
        {
            where:{
                id
            }
        }
     )
   }
 
   async getJobApplicationbyJobId (jobId:number){
    return await this.prisma.jobApplication.findMany({
        where:{
            jobId:jobId
        }

    })
   
   }
   async createcadidate(
    data:{
  name :   string,
  email :  string,
  phone:string,
  address :string,
  experience: number,
  skills :    string,
  currentCompany :string,
  noticePeriod :  number ,
  ctc:number,
  expectedCtc: number ,
  resumeLink : string,
  jobId : number,
  status:string
  //!you don't need to hand it the entire Job object. The database only needs to know the Foreign Key! The Fix: Change job: Job to jobId: number.
    }
)
{
  return await this.prisma.jobApplication.create({
        data:{
            email:data.email,
            name:data.name,
            phone:data.phone,
            address:data.address,
            ctc:data.ctc,
            experience:data.experience,
            skills:data.skills,
            currentCompany:data.currentCompany,
            noticePeriod:data.noticePeriod,
            expectedCtc:data.expectedCtc,
            resumeLink:data.resumeLink,
            jobId:data.jobId,
            status:"APPLIED"
        }

    })
}
async updatecandidatestatus(
status:JobApplicationStatus,
applicationId:number
){
return await this.prisma.jobApplication.update({
    where:{id:applicationId},
    data:{
        status:status
    }
})

}
}