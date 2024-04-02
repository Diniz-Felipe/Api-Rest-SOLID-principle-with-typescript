import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { MongoGetUsersRepository } from "./repositories/users/get-users/mongo-get-users";
import { GetUsersController } from "./controllers/users/get-users/get-users";
// import DB
import { MongoClient } from "./database/mongo";
import { MongoCreateUserRepository } from "./repositories/users/create-user/mongo-create-user";
import { CreateUserController } from './controllers/users/create-user/create-user';
import { MongoUpdateUserRepository } from './repositories/users/update-user/mongo-update-user';
import { UpdateUserController } from './controllers/users/update-user/update-user';
import { DeleteUserController } from "./controllers/users/delete-user/delete-user";
import { MongoDeleteUserRepository } from "./repositories/users/delete-user/mongo-delete-user";

const main = async () => {
    config({ path: __dirname + '../../../../.env' });
    // instance express
    const app = express();

    // DB connection
    await MongoClient.connect();
    const PORT = process.env.NODE_PORT || 4001;

    app.use(cors());

    app.use(express.json());

    // routes API para a dashboard
    app.get("/users", async (req, res) => {
        const mongoGetUsersRepository = new MongoGetUsersRepository();

        const getUsersController = new GetUsersController(mongoGetUsersRepository)

        const { body, statusCode } = await getUsersController.handle()

        res.status(statusCode).send({ msg: body })
    });

    // get user para o login
    app.get("/auth", async (req, res) => {
        const mongoGetUsersRepository = new MongoGetUsersRepository();

        const getUsersController = new GetUsersController(mongoGetUsersRepository)

        const { body, statusCode } = await getUsersController.handle();

        res.status(statusCode).send({ msg: body })
    });

    // register user para o cadastro
    app.post("/auth/register", async (req, res) => {
        const mongoCreateUserRepository = new MongoCreateUserRepository();

        const createUserController = new CreateUserController(mongoCreateUserRepository)

        const { body, statusCode } = await createUserController.handle({
            body: req.body,
        });

        res.status(statusCode).send({ msg: body })
    });

    app.patch("/auth/:id", async (req, res) => {
        const mongoUpdateUserRepository = new MongoUpdateUserRepository();

        const updateUserController = new UpdateUserController(mongoUpdateUserRepository);

        const { body, statusCode } = await updateUserController.handle({
            body: req.body,
            params: req.params
        });

        res.status(statusCode).send({ msg: body });
    });

    // delete user! para o app
    app.delete("/users/:id", async (req, res) => {
        const mongoDeleteUserRepository = new MongoDeleteUserRepository()

        const deleteUserController = new DeleteUserController(mongoDeleteUserRepository)

        const { body, statusCode } = await deleteUserController.handle({
            params: req.params,
        })

        res.status(statusCode).send({ msg: body })
    });

    app.listen(PORT, () => console.log(`runnig ${PORT}, ${process.env.BASE_NODE}:${PORT}`));
};
main();