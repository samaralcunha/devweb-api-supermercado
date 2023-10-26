import express from "express";
import { GetUsersController } from "./controllers/get-users/get-users";
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users";

const app = express();

const port = 8000;

app.get("/users", async (req, res) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();
    const getUsersController = new GetUsersController(mongoGetUsersRepository);
    const { statusCode, body } = await getUsersController.handle();

    res.status(statusCode).send(body);
});

app.listen(port);
