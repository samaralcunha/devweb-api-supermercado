import { User } from '../../models/user';
import { HttpRequest, HttpResponse } from '../protocols';
import { IUpdateUserController, IUpdateUserRepository } from './protocols';

export class UpdateUserController implements IUpdateUserController {
    constructor(private readonly updateUserRepository: IUpdateUserRepository) {}
    async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>> {
        const id = httpRequest.params.id;
        const body = httpRequest.body;
        try {
            if (!id) {
                return {
                    statusCode: 400,
                    body: 'Parâmetro id não foi encontrado',
                };
            }
            const user = await this.updateUserRepository.updateUser(id, body);

            return {
                statusCode: 200,
                body: user,
            };
        } catch (error) {
            return {
                statusCode: 500,
                body: 'Erro no UpdateUserController',
            };
        }
    }
}
