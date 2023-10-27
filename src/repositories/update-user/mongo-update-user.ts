import { ObjectId } from 'mongodb';
import { IUpdateUserRepository, UpdateUserParams } from '../../controllers/update-user/protocols';
import { MongoClient } from '../../database/mongo';
import { User } from '../../models/user';

export class MongoUpdateUserRepository implements IUpdateUserRepository {
    async updateUser(id: string, params: UpdateUserParams): Promise<User> {
        await MongoClient.db.collection('users').updateOne(
            { _id: new ObjectId(id) },
            {
                $set: { ...params },
            },
        );

        const user = await MongoClient.db.collection<Omit<User, 'id'>>('users').findOne({ _id: new ObjectId(id) });

        // se o update do usuário deu erro
        if (!user) {
            throw new Error('Erro ao alterar usuário');
        }

        // separo o _id do resto do usuário
        const { _id, ...rest } = user;

        // renomeia o _id para id
        return { id: _id.toHexString(), ...rest };
    }
}
