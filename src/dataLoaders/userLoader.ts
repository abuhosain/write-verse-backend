import { User } from "@prisma/client";
import { prisma } from ".."; 
import DataLoader from "dataloader";

const batchUsers = async (ids: number[]): Promise<User[]> => {
    // ids [1,2,3]
    const users = await  prisma.user.findMany({
        where: {
            id: {
                in: ids,
            },
        },
    });

    /**
     * 1 : {id : 1, name: "John"}
     * 2 : {id : 2, name: "Doe"}
     * 3 : {id : 3, name: "Smith"}
     */
    const userData : {[key : string] : User} = {};
    
    users.forEach((user) => {
        userData[user.id] = user;
    });

 return   ids.map((id) => userData[id] )

}

// @ts-ignore
export const userLoader = new DataLoader<number, User>(batchUsers);