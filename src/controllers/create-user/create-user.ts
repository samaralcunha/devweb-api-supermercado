import { User } from '../../models/user';
import { HttpRequest, HttpResponse } from '../protocols';
import { CreateUserParams, ICreateUserController, ICreateUserRepository } from './protocols';

export class CreateUserController implements ICreateUserController {
    constructor(private readonly createUserRepository: ICreateUserRepository) {}
    async handle(httpRequest: HttpRequest<CreateUserParams>): Promise<HttpResponse<User>> {
        try {
            // validar se body existe
            if (!httpRequest.body) {
                return {
                    statusCode: 400,
                    body: 'Body da requisição não foi encontrado',
                };
            }

            // validar campos
            const requiredFiels = ['firstName', 'lastName', 'email', 'password'];
            for (const field of requiredFiels) {
                if (!httpRequest.body[field as keyof CreateUserParams]?.length) {
                    return {
                        statusCode: 400,
                        body: `Campo ${field} não foi informado`,
                    };
                }
            }

            const { body } = httpRequest;
            const user = await this.createUserRepository.createUser(body);

            return {
                statusCode: 201,
                body: user,
            };
        } catch (error) {
            return {
                statusCode: 500,
                body: 'Erro no CreateUserController',
            };
        }
    }
}
