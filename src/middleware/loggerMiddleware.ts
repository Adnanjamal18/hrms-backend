import type { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger.js";

const loggermiddleware= async(res:Response,req:Request,next:NextFunction )=>{

   const start = Date.now()
   
   res.on('finish',()=>{
   const duration = Date.now() - start;
   logger.info(
      `[${req.method}] ${req.originalUrl}
      -Status = ${res.statusCode}
      - ${duration}ms`
   )
   });
   next()
}
export default loggermiddleware



