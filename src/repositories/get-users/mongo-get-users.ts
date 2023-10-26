import { IGetUsersRepository } from "../../controllers/get-users/protocols";
import { User } from "../../models/user";

export class MongoGetUsersRepository implements IGetUsersRepository {
    async getUsers(): Promise<User[]> {
        return [
            {
                firstName: "Lucas",
                lastName: "Simão",
                email: "Lucassimaog6@gmail.com",
                password: "senhasupersecreta123",
            },
        ];
    }
}
