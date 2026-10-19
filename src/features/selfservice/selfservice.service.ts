import type { SelfServiceRepository } from "./selfservice.repository.js";

export class SelfServiceService{
    constructor (private readonly repository:SelfServiceRepository){}
    
        async updateProfile(userId:string,data:any){
            if(userId == undefined){
                throw new Error("not authorized")
            }
            if(data==undefined){
                throw new Error("you are not updating anything")
            }
        const updateddata =await this.repository.updateProfile(userId,data)
        return updateddata
        }
    }

    
