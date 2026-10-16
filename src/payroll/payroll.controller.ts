import type { NextFunction, Request, Response } from "express";
import type { PayrollService } from "./payroll.service.js";

export class PayrollController {
    constructor(private readonly service: PayrollService){}
    createpayroll=async (req:Request,res:Response,next:NextFunction)=>{
       const userId= req.params.id as string;
       const data = req.body;
      const  payroll = await this.service.createpayroll(userId,data)
      res.status(200).json({
        message:"success",
        data: payroll
      })
    }

   createSalary=async(req:Request,res:Response,next:NextFunction)=>{
    const userId= String(req.params.id)
    const amount= req.body.amount
    try{
      const salary=await this.service.createsalary(userId,amount)
      res.status(200).json({
        status:"success",
        data:salary
      })
    }catch(error){
      next(error)
    }
    

   }
   getSalaryById=async(req:Request,res:Response,next:NextFunction)=>{
    const userId= String(req.params.id)
    try{const salary=await this.service.getSalaryById(userId)
    res.status(200).json(
    {  staus:"success",
      data:salary}
    )
  }catch(error){
    next(error)
  }
    
   }


}