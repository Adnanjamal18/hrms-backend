import type { PayrollRepository } from "./payroll.repository.js";

export class PayrollService{
    constructor(private readonly repository : PayrollRepository){}
    
}