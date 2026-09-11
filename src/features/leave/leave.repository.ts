// import { PrismaClient } from "@prisma/client";

// export class LeaveRepository{
// constructor(private readonly prisma:PrismaClient){}
// async createLeave(data:{
//     userId:string;
//     departmentId:number;
//     leaveTypeId:string;
//     fromDate:Date;
//     toDate:Date;
//     purpose:string;
// })
// {
//     const leave = await 
//     this.prisma.leaveManagement.create({
//         data:{
//             userId:data.userId,
//             departmentId: data.departmentId,
//             leaveTypeId: data.leaveTypeId,
//             fromDate: data.fromDate,
//             toDate:data.toDate,
//             purpose: data.purpose,
//             approveStatus: "PENDING",
//             requestStatus: "OPEN",
//         }
//     });
//     return leave;
// }
// }
