import { IGetProductRepository } from '../controllers/get-products/protocols';
import { MongoClient } from '../database/mongo';
import { Product } from '../models/product';

export class GetProductRepository implements IGetProductRepository {
    async getProducts(): Promise<Product[]> {
        const products = await MongoClient.db.collection<Omit<Product, 'id'>>('products').find().toArray();
        return products.map(({ _id, ...product }) => ({ ...product, id: _id.toHexString() }));
    }
}
