import { User } from '../../models/user';
import { HttpRequest, HttpResponse } from '../protocols';
import { IDeleteUserController, IDeleteUserRepository } from './protocols';

export class DeleteUserController implements IDeleteUserController {
    constructor(private readonly deleteUserRepository: IDeleteUserRepository) {}
    async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>> {
        try {
            const id = httpRequest.params.id;
            if (!id) {
                return {
                    statusCode: 400,
                    body: 'Parâmetro id não foi encontrado',
                };
            }
            const user = await this.deleteUserRepository.deleteUser(id)
            return {
                statusCode: 200,
                body: user,
            };
        } catch (error) {
            return {
                statusCode: 500,
                body: 'Erro no DeleteUserController',
            };
        }
    }
}
