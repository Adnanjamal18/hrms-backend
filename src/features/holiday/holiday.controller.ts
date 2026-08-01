import type { Request, Response} from "express";
import { prisma } from "../../config/db.js";
import { logger } from "../../utils/logger.js";
import { requireAdmin } from "../../utils/admincheck.js";

export const createholiday =async (req: Request,res:Response)=>{
  const session =await requireAdmin(req,res)
  if(!session)return;
 try{
  const createholiday = await prisma.holiday.create({
   data:{
    date: new Date(req.body.date),
    name:req.body.name,
    description:req.body.description
   }
})  
res.status(201).json({message:"holiday successfully created for ",createholiday})
 }catch(error){
    res.status(401).json({error: "failed during creation of holiday"})
 }   
}

export const updateholiday= async (req:Request,res:Response)=>{
  const {id} = req.params  
  const session=await requireAdmin(req,res)
   if(!session)return;
try{
     const updatedholiday = await prisma.holiday.update({
     where: {id:id as string },   
     data:{
    date: new Date(req.body.date),
    name:req.body.name,
    description:req.body.description
     }
    })
    res.status(200).json({message : "updated holiday successfully",updatedholiday})
}catch(error){
    res.status(401).json({
        error:"could'nt update holiday please try again later"
    })
}
}

export const getallholidays = async (req: Request, res: Response) => {
  try {
    const holidays = await prisma.holiday.findMany({
      orderBy: { date: "asc" },
    });
    res.status(200).json(holidays);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch holidays" });
  }
};

export const deleteholiday = async (req: Request, res: Response) => {
  const { id } = req.params;
  const session = await requireAdmin(req, res);
  if (!session) return;
  try {
    await prisma.holiday.delete({
      where: { id: id as string },
    });
    res.status(200).json({ message: "Holiday deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete holiday" });
  }
};