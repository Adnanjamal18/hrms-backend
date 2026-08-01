import { prisma } from "../../config/db.js";
import type { Request,Response,NextFunction } from "express";
import { logger } from "../../utils/logger.js";
import { auth } from "../auth/auth.js";
import { requireAdmin } from "../../utils/admincheck.js";


export const getallusers = async(req:Request,res:Response,)=>{
    try{
const users = prisma.user.findMany({
    select:{
        id:true,
        fullName:true,
        email:true,
        roleId:true,
        createdAt:true,
        leaves:true,

    }
})
res.json({
    data:{
     users
    }
})
}catch(error){
res.status(500).json({error:"failed to fetch users"})
}
}


export const updateauser= async (req:Request,res:Response)=>{
    const session = await requireAdmin(req,res)
    if(!session) return;
    
try{
    const {id} = req.params;
  const updateduser= await prisma.user.update({
    where:{id:id as string},
    data:{
        roleId:Number(req.body.roleId),
        fullName:req.body.fullName
    }
  })
    res.json({
        message : "user updated successfully", user:updateduser
    })
}catch(error){
 res.status(500).json({error: "Failed to update user"})
}
}


export const deleteUser = async (req: Request,res: Response, ) => {
  const session = await requireAdmin(req,res);
  if (!session) return; 

  const { id } = req.params;

  try {
    await prisma.user.delete({
      where: { id: id as string },
    });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};


