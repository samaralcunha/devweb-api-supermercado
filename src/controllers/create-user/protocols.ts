import { User } from '../../models/user';
import { HttpRequest, HttpResponse } from '../protocols';

export interface ICreateUserController {
    handle(httpRequest: HttpRequest<CreateUserParams>): Promise<HttpResponse<User>>;
}

// isso é pra representar oq é nessecário pra criar um usuário
export interface CreateUserParams {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface ICreateUserRepository {
    // pra criar um usuário a função precisa receber esse parametros, e ela retorna um usuário
    createUser(params: CreateUserParams): Promise<User>;
}
