import { CreateUserParams, ICreateUserRepository } from '../../controllers/create-user/protocols';
import { MongoClient } from '../../database/mongo';
import { User } from '../../models/user';

export class MongoCreateUserRepository implements ICreateUserRepository {
    async createUser(params: CreateUserParams): Promise<User> {
        // vou inserir no banco, e pegar o ID desse objeto inserido
        const { insertedId } = await MongoClient.db.collection('users').insertOne(params);

        // Busco no banco pra ver se o usuário foi realmente inserido
        const user = await MongoClient.db.collection<Omit<User, 'id'>>('users').findOne({ _id: insertedId });

        // se a criação do usuário deu erro
        if (!user) {
            throw new Error('Erro ao criar usuário');
        }

        // separo o _id do resto do usuário
        const { _id, ...rest } = user;

        // renomeia o _id para id
        return { id: _id.toHexString(), ...rest };
    }
}
