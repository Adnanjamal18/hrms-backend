
import type { Request,Response, } from "express";
import { auth } from "../features/auth/auth.js";
import { fromNodeHeaders } from "better-auth/node";

export const requireAdmin = async (req:Request,res:Response)=>{
  const  session =await auth.api.getSession ({headers:fromNodeHeaders(req.headers)})
  console.log('Session:', session); if(!session){
    res.status(401).json({message:"unauthorized"});
    return null
  }
  if(session.user.roleId!==1){
    res.status(403).json({message:"Forbidden : Admin access required"})
    return null
  }
  return session;
}