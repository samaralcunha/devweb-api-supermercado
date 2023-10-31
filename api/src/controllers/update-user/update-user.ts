import { User } from '../../models/user';
import { HttpRequest, HttpResponse, IController } from '../protocols';
import { IUpdateUserRepository, UpdateUserParams } from './protocols';

export class UpdateUserController implements IController {
    constructor(private readonly updateUserRepository: IUpdateUserRepository) {}
    async handle(httpRequest: HttpRequest<UpdateUserParams>): Promise<HttpResponse<User>> {
        const id = httpRequest.params.id;
        const body = httpRequest.body;
        try {
            if (!id) {
                return {
                    statusCode: 400,
                    body: 'Parâmetro id não foi encontrado',
                };
            }
            if (!body) {
                return {
                    statusCode: 400,
                    body: 'body não foi encontrado',
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
