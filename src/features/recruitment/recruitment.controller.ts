import { number } from "zod";
import type { Recruitmentservice } from "./recruitment.service.js";
import type { Request, Response, NextFunction } from "express";
export class RecruitmentController{
 constructor (private readonly service:Recruitmentservice){}

 getAllJobs = async (_req: Request, res: Response, next: NextFunction) => {
   try {
     const jobs = await this.service.getAllJobs();
     res.status(200).json({
       message: "Fetched jobs successfully",
       data: jobs
     });
   } catch (error) {
     next(error);
   }
 };
 createjobposting=async(req:Request,res:Response,next:NextFunction)=>{
    try{
      const jobdata =req.body;

     const result = await this.service.createjobposting(jobdata)
     
     res.status(201).json({
      message:"job created successfuly",
      data:result
     })
    }catch(error){
      next(error)
    }
 }

 updatejobposting = async (req:Request,res:Response,next:NextFunction)=>{
   try{
     
     const id = Number( req.params.id)
     const data = req.body;
    const result = await this.service.updateJobPosting(id,data )
    res.status(201).json({
      message:"success",
      data:result
    })
   }catch(error){
    next(error)
   }
 }

 deletejobposting=async(req :Request ,res:Response,next:NextFunction)=>{
  const id= Number(req.params.id)
  try{
    const result= await this.service.deletejobposting(id)
    res.json({
      message:"deleted data successfully",
      result : result
    })
  }catch(error){
      next(error)
  }
  
 }

 getJobApplicationbyJobId=async (req:Request,res:Response,next:NextFunction)=>{ 
  const id = Number(req.params.id)
  try{ const candidates= await this.service.getJobApplicationbyJobId(id)
    //If you forget await, JavaScript will not wait for the database to finish searching. It will immediately send the response back to the user,
    //and the data: candidates will literally just say Promise { <pending> } instead of showing the actual candidates!
  res.status(200).json({
    message:"Fetched Canidates Successfully",
    data: candidates
  })
}catch(error){
  next(error)
} 
 }

 createcadidate=async (req : Request,res:Response,next: NextFunction)=>{
  const data = req.body  
  try{
 const candidate = await this.service.createcadidate(data)
  res.status(200).json({
    message:"created succeded",
    data:data
  })
}catch(error){
  next(error)
}
 }
   updatecandidatestatus=async(req:Request,res:Response,next:NextFunction)=>{
   const jobid =  Number(req.params.id);
   const status = req.body.status;
   const candidate = await this.service.updatecandidatestatus(status,jobid)
   res.status(200).json({
    message:"success",
    data:candidate
   })
  }
}