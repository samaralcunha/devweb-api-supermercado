import { Product } from '../../models/product';

export interface CreateProductParams {
    nome: string;
    preco: number;
    categoria: string;
    quantidade: number;
    desconto: number;
}

export interface ICreateProductRepository {
    createProduct(params: CreateProductParams): Promise<Product>;
}
