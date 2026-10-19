import type { PrismaClient } from "@prisma/client";

export class SelfServiceRepository{
    constructor(private readonly prisma:PrismaClient){}
    async updateProfile(userId:string,data:any){
    const updateddata = await this.prisma.user.update({
        where:{id:userId},
        data:{
            ...(data.username!==undefined&&{username:data.username}),
            ...(data.email!==undefined&&{email:data.email}),
            ...(data.password!==undefined&&{password:data.password}),
            ...(data.image!==undefined&&{image:data.image}),
            ...(data.mobile!==undefined&&{mobile:data.mobile}),
        }
    })
    return updateddata
    }

    async updatepassword(userId:string){
    const user =await this.prisma.user.findUnique({
        where:{id:userId},
    select:{
        password
    }
    }) 

    }
  
}