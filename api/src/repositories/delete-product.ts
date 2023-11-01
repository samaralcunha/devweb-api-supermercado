import { ObjectId } from 'mongodb';
import { IDEleteProductRepository } from '../controllers/delete-product/protocols';
import { MongoClient } from '../database/mongo';
import { Product } from '../models/product';

export class DeleteProductRepository implements IDEleteProductRepository {
    async deleteProduct(id: string): Promise<Product> {
        const product = await MongoClient.db
            .collection<Omit<Product, 'id'>>('products')
            .findOne({ _id: new ObjectId(id) });
        if (!product) {
            throw new Error('Produto não encontrado');
        }
        const { deletedCount } = await MongoClient.db.collection('products').deleteOne({ _id: new ObjectId(id) });
        if (!deletedCount) {
            throw new Error('Produto não deletado');
        }
        const { _id, ...rest } = product;
        return { id: _id.toHexString(), ...rest };
    }
}
