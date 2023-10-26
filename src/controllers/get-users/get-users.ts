import { IGetUsersController, IGetUsersRepository } from "./protocols";

export class GetUsersController implements IGetUsersController {
    constructor(private readonly getUsersRepository: IGetUsersRepository) {}
    async handle() {
        try {
            const users = await this.getUsersRepository.getUser();
            return {
                statusCode: 200,
                body: users,
            };
        } catch (error) {
            return {
                statusCode: 200,
                body: "Erro ao comunicar com o banco: " + error,
            };
        }
    }
}
