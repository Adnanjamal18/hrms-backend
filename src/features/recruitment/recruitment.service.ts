import { error } from "node:console";
import type { RecruitmentRepository } from "./recruitment.repository.js";


export class Recruitmentservice{
    constructor(private readonly repository: RecruitmentRepository){}
    //All business Logic (Brain working)
   async createjobposting(jobdata:any){
    if(jobdata.description==null){
        throw new Error("You cannot pay someone a negative salary");
    }
    if(jobdata.departmentid == null){
        throw new Error("Please provide a deparment id");
    }
    if(jobdata.title==null){
        throw new Error("Please Provide a title");
    }
     //Now Call Chef To To Save The Data
  
   const newjob = await this.repository.createjobposting({
    title:jobdata.title,
    departmentid:jobdata.departmentid,
    description:jobdata.description,
   })
   return newjob;
   //Return it back to the controller
 }


async updateJobPosting(jobdata:any){
    if(jobdata.id==null){
        throw new Error("invalid user id")
    }
    if(jobdata.title== null ){
        throw new Error ("write proper title for update")
    }
   const newjobupdate = await this.repository.updatejobposting(jobdata.id,{
     title:jobdata.title,
     description:jobdata.description,
     departmentId:jobdata.departmentid
   })
   return newjobupdate
}

   
}