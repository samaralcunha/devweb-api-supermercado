import cors from 'cors';
import express from 'express';
import { CreateProductController } from './controllers/create-product/create-product';
import { GetProductController } from './controllers/get-products/get-products';
import { MongoClient } from './database/mongo';
import { GetProductRepository } from './repositories/get-products';
import { CreateProductRepository } from './repositories/create-product';
import { UpdateProductsRepository } from './repositories/update-product';
import { DeleteProductRepository } from './repositories/delete-product';
import { UpdateProductController } from './controllers/update-product/update-product';
import { DeleteProductController } from './controllers/delete-product/delete-product';

const main = async () => {
    const app = express();
    app.use(express.json());
    app.use(cors());
    const port = 8000;

    await MongoClient.connect();

    app.get('/products', async (req, res) => {
        const getProductRepository = new GetProductRepository();
        const getProductController = new GetProductController(getProductRepository);
        const { statusCode, body } = await getProductController.handle();
        res.status(statusCode).send(body);
    });

    app.post('/products', async (req, res) => {
        const createProductRepository = new CreateProductRepository();
        const createProductController = new CreateProductController(createProductRepository);
        const { statusCode, body } = await createProductController.handle({
            body: req.body,
        });
        res.status(statusCode).send(body);
    });

    app.put('/products/:id', async (req, res) => {
        const updateProductRepository = new UpdateProductsRepository();
        const updateProductController = new UpdateProductController(updateProductRepository);
        const { statusCode, body } = await updateProductController.handle({
            body: req.body,
            params: req.params,
        });
        res.status(statusCode).send(body);
    });

    app.delete('/products/:id', async (req, res) => {
        const deleteProductRepository = new DeleteProductRepository();
        const deleteProductController = new DeleteProductController(deleteProductRepository);
        const { statusCode, body } = await deleteProductController.handle({
            params: req.params,
        });
        res.status(statusCode).send(body);
    });

    app.listen(port);
};
main();
