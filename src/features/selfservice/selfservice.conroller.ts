import type { NextFunction, Request, Response } from "express";
import type { SelfServiceService } from "./selfservice.service.js";

export class SelfServiceController{
    constructor(private readonly service:SelfServiceService){}
   updateProfile=async(req:Request,res:Response,next:NextFunction)=>{
     const userId=String(req.params.id)
     const data=req.body
     try{
        const updateddata=await this.service.updateProfile(userId,data)
   res.status(200).json({
    status:"success",
    data:updateddata
   })
     }catch(error){
     next(error)
     }
   
   }

    updatepassword =async (req:Request,res:Response,next:NextFunction)=>{
      const userId = String(req.params.id)
      const newpass = req.body.newpassword
      const oldpass = req.body.currentpassword
      try{
    const updatedpass = await this.service.updatepassword(userId,oldpass,newpass,)
    res.status(200).json({
      status:"Success",
      data:updatedpass
    })
      }catch(error){
        next(error)
      }
    }
}