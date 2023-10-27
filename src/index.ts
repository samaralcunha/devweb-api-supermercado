import express from 'express';
import { CreateUserController } from './controllers/create-user/create-user';
import { DeleteUserController } from './controllers/delete-user/delete-user';
import { GetUsersController } from './controllers/get-users/get-users';
import { UpdateUserController } from './controllers/update-user/update-user';
import { MongoClient } from './database/mongo';
import { MongoCreateUserRepository } from './repositories/create-user/mongo-create-user';
import { MongoDeleteUserRepository } from './repositories/delete-user/mongo-delete-user';
import { MongoGetUsersRepository } from './repositories/get-users/mongo-get-users';
import { MongoUpdateUserRepository } from './repositories/update-user/mongo-update-user';

const main = async () => {
    const app = express();
    app.use(express.json());
    const port = 8000;

    await MongoClient.connect();

    app.get('/users', async (req, res) => {
        const mongoGetUsersRepository = new MongoGetUsersRepository();
        const getUsersController = new GetUsersController(mongoGetUsersRepository);
        const { statusCode, body } = await getUsersController.handle();

        res.status(statusCode).send(body);
    });

    app.post('/users', async (req, res) => {
        const mongoCreateUsersRepository = new MongoCreateUserRepository();
        const createUserController = new CreateUserController(mongoCreateUsersRepository);
        const { statusCode, body } = await createUserController.handle({
            body: req.body,
        });

        res.status(statusCode).send(body);
    });

    app.put('/users/:id', async (req, res) => {
        const mongoUpdateUserRepository = new MongoUpdateUserRepository();
        const updateUserController = new UpdateUserController(mongoUpdateUserRepository);
        const { statusCode, body } = await updateUserController.handle({
            body: req.body,
            params: req.params,
        });
        res.status(statusCode).send(body);
    });

    app.delete('/users/:id', async (req, res) => {
        const mongoDeleteUserRepository = new MongoDeleteUserRepository();
        const deleteUserController = new DeleteUserController(mongoDeleteUserRepository);
        const { statusCode, body } = await deleteUserController.handle({
            params: req.params,
        });
        res.status(statusCode).send(body);
    });

    app.listen(port);
};

main();
