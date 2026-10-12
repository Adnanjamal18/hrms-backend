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

   

}