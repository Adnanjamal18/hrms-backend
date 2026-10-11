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

}