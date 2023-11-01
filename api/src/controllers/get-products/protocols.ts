import { Product } from '../../models/product';

export interface IGetProductRepository {
    getProducts(): Promise<Product[]>;
}
