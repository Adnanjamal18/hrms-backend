import { PrismaClient } from "@prisma/client";
export class PayrollRepository{
    constructor(private readonly prisma:PrismaClient){}
}