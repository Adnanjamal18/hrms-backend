import type { NextFunction, Request, Response } from "express";
import type { SelfServiceService } from "./selfservice.service.js";

export class SelfServiceController{
    constructor(private readonly service:SelfServiceService){}
   updateProfile=async(req:Request,res:Response,next:NextFunction)=>{
     const userId=String(req.params.id)
     const data=req.body
     try{
        const updateddata= this.service.updateProfile(userId,data)
   res.status(200).json({
    status:"success",
    data:updateddata
   })
     }catch(error){
     next(error)
     }
   
   }
}