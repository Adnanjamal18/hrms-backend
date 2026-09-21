import type { Recruitmentservice } from "./recruitment.service.js";
import type { Request, Response, NextFunction } from "express";
export class RecruitmentController{
 constructor (private readonly service:Recruitmentservice){}
 createjobposting=async(res:Response,req:Request,next:NextFunction)=>{
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

 updatejobposting = async (res:Response,req:Request,next:NextFunction)=>{
   try{
     const jobdata = req.body
     const id = req.headers
    const result = this.service.updateJobPosting(id)
    res.status(201).json({
      message:"success",
      data:result
    })
   }catch(error){
    next(error)
   }
 }
}