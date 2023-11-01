import { CreateProductParams, ICreateProductRepository } from "../controllers/create-product/protocols";
import { MongoClient } from "../database/mongo";
import { Product } from "../models/product";

export class CreateProductRepository implements ICreateProductRepository {
    async createProduct(params: CreateProductParams): Promise<Product> {
        const { insertedId } =  await MongoClient.db.collection('products').insertOne(params);
        const product = await MongoClient.db.collection<Omit<Product, 'id'>>('products').findOne({ _id: insertedId });
        if (!product) {
            throw new Error('Erro ao criar produto');
        }
        const { _id, ...rest } = product;
        return { id: _id.toHexString(), ...rest };
    }

}