import { ObjectId } from 'mongodb';
import { IUpdateProductRepository, UpdateProductParams } from '../controllers/update-product/protocols';
import { MongoClient } from '../database/mongo';
import { Product } from '../models/product';

export class UpdateProductsRepository implements IUpdateProductRepository {
    async updateProduct(id: string, params: UpdateProductParams): Promise<Product> {
        await MongoClient.db.collection('products').updateOne(
            { _id: new ObjectId(id) },
            {
                $set: { ...params },
            },
        );
        const product = await MongoClient.db
            .collection<Omit<Product, 'id'>>('products')
            .findOne({ _id: new ObjectId(id) });
        if (!product) {
            throw new Error('Erro ao alterar produto');
        }
        const { _id, ...rest } = product;
        return { id: _id.toHexString(), ...rest };
    }
}
