import { prisma } from "../../config/db.js";
import type { Request,Response } from "express";
import { logger } from "../../utils/logger.js";

export const createproject = (req:Request,res:Response)=>{
    
    project = prisma.project.create
}