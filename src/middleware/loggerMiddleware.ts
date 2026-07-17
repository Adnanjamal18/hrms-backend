import type { Request, Response, NextFunction } from "express";
import logger from "../utils/logger.js";

const loggermiddleware= async(res:Response,req:Request,next:NextFunction )=>{

   const start = Date.now()
   
   res.on('finish',()=>{
   const duration = Date.now() - start;
   logger.info(`[${req.method}] ${req.originalUrl} -Status = ${res.statusCode} - ${duration}ms`)
   });
   next()
}
export default loggermiddleware



// i have read all comments and notes you wrote and recived some doubts i will list them down please explain them to me iconsidering iam a beginner explain each doubt via the examples and easy words i have separated all doubts via the comma here is list : why do we use the combine method here again transports:[
//     new winston.transports.Console({
//         format: winston.format.combine(
//             winston.format.colorize(),
//             winston.format.simple()
//         )
//      })
//     ]  ,   const start = Date.now()
   
//    res.on('finish',()=>{
//    const duration = Date.now() - start;
//    logger.info(`[${req.method}] ${req.originalUrl} -Status = ${res.statusCode} - ${duration}ms`)
//    });
//    next()
// } here we are calculating the duration but never passed it to logger then how is logger going to log the duration time ,
// my next doubt is why are we having to build validator.ts middleware when we have authvalidator.ts already 