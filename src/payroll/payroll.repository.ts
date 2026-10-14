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

    async createSalary (userId:string , amount:number){
       const salary = await this.prisma.salary.create({
        data:{
            amount:amount,
            user:{connect:{
                id:userId
            }}
            
        }
       })
       return salary
    }
    async getSalaryByUserId (userId:string ){
       const salary = await this.prisma.salary.findFirst({
        where:{userId},
        orderBy:{createdAt:"desc"}
       })
       return salary
    }
}