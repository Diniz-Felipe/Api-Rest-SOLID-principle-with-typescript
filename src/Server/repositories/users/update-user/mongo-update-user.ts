import { ObjectId } from "mongodb";
import { UpdateUserParams, IUpdateUserRepository } from "../../../controllers/users/update-user/protocols";
import { MongoClient } from "../../../database/mongo";
import { User } from "../../../models/user";
import { MongoUser } from "../../mongo-protocols";

export class MongoUpdateUserRepository implements IUpdateUserRepository {
    async updateUser(id: string, params: UpdateUserParams
        ): Promise<User> {
        await MongoClient.db.collection("users").updateOne(
            { _id: new ObjectId(id) }, 
            { 
                $set: {
                    ...params,
                },
            },
        );

        const user = await MongoClient.db
            .collection<MongoUser>("users")
            .findOne({ _id: new ObjectId(id) });

        if (!user) {
            throw new Error("User not update!");
        }
        
        const { _id, ...rest } = user;

        return { id: _id.toHexString(), ...rest }
    }
    
}