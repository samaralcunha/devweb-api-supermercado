import { IGetUsersRepository } from "../../controllers/get-users/protocols";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";

export class MongoGetUsersRepository implements IGetUsersRepository {
    async getUsers(): Promise<User[]> {
        // isso é pra ele pegar do mongo, com o find msm
        // esse <Omit<User, "id">> é pq nosso usuário tem um campo id, mas o mongo usa o campo _id
        const users = await MongoClient.db.collection<Omit<User, "id">>("users").find().toArray();

        // isso aqui é pra ele pegar todo _id e transformar em id
        return users.map(({ _id, ...user }) => ({ ...user, id: _id.toHexString() }));
    }
}
