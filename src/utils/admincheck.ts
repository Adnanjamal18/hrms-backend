
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

export const requireAdminOrSuperAdmin = async (req: Request, res: Response) => {
  const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });

  if (!session) {
    res.status(401).json({ error: "Unauthorized" });
    return null;
  }
  
  if (session.user.roleId !== 1 && session.user.roleId !== 2) {
    res.status(403).json({ message: "Forbidden: Admin access required" });
    return null;
  }

  return session;
}

export const requireManager = async (req: Request, res: Response) => {
  const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });
  
  if (!session) {
    res.status(401).json({ error: "You are not authorized" });
    return null;
  }
  
  if (session.user.roleId !== 1 && session.user.roleId !== 2 && session.user.roleId !== 3) {
    res.status(403).json({ error: "You are not authorized" });
    return null;
  }
  
  return session;
}