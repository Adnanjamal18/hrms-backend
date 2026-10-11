import { PrismaClient } from "@prisma/client";
export class PayrollRepository{
    constructor(private readonly prisma:PrismaClient){}
    async createpayroll(userid:string , data:any){
   const payroll = await this.prisma.payroll.create({
    data:{
     amount:data.amount,
     userId:userid,
    }
   });
   return payroll;
    }
}