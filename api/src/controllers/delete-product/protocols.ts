import { Product } from '../../models/product';

export interface IDEleteProductRepository {
    deleteProduct(id: string): Promise<Product>;
}
