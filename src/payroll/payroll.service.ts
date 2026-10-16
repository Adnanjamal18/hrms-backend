import type { PayrollRepository } from "./payroll.repository.js";

export class PayrollService{
    constructor(private readonly repository : PayrollRepository){}
    async createpayroll(userId:string ,data:any){
    if(data.amount== undefined){
        throw new Error("invalid ammount write please")
    }
    if(userId== undefined){
        throw new Error("unauthorized invalid token")
    }
    const payroll = await this.repository.createpayroll(userId,data)
    return payroll
    }

    async getAllPayrollbyId(userId:string){
      if(userId==undefined){
         throw new Error("you are not authorized")
      }
      const payrolls = await this.repository.getAllPayrollbyId(userId)
      return payrolls
    }


  async createsalary (userId:string , amount:number){
     if(userId==undefined){
        throw new Error("not authorized")
     }
     if(amount==undefined){
        throw new Error("no ammound defined")
     }
     const salary = await this.repository.createSalary(userId,amount)
    return salary
  }
  async getSalaryById(userId:string){
   if(userId==undefined){
    throw new Error ("unauthorized")
   }
   const salary = await this.repository.getSalaryByUserId(userId)
   if (!salary) {
  throw new Error("No salary found for this user")
}
   return salary 
  }

  async payslip(payrollId:string){
  if(payrollId==undefined){
   throw new Error("invalid id")
  }
  const payslip = this.repository.
  }

    
}