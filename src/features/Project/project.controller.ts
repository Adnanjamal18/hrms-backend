import { prisma } from "../../config/db.js";
import type { Request,Response } from "express";
import { logger } from "../../utils/logger.js";
import { requireAdmin, requireAdminOrSuperAdmin } from "../../utils/admincheck.js";

export const createproject = async (req:Request,res:Response)=>{
  const session=  requireAdminOrSuperAdmin(req,res)
  if(!session) return;
   const project = await prisma.project.create({
     data:{
        name:req.body.name,
        description:req.body.description,
        managerId:req.body.managerId,
        departmentId:req.body.departmentId,
        teamLeadId:req.body.teamLeadId
     }
    })
}


export const assignedproject= async(req:Request,res:Response) =>{
 await prisma.project.update({
 where:{id: req.body.id as String},
 data:{
    managerId:req.body.managerId,
    departmentId:req.body.departmentId
 }
})

}

export const getMyprojects =async(req:Request,res:Response)=>{
const session = await requireAdmin(req,res)
if(!session){
    return res.status(401).json({error:"you are not authorized"})
}

}