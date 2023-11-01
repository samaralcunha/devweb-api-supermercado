import { Product } from '../../models/product';

export interface UpdateProductParams {
    nome: string;
    preco: number;
    categoria: string;
    quantidade: number;
    desconto: number;
}

export interface IUpdateProductRepository {
    updateProduct(id: string, params: UpdateProductParams): Promise<Product>;
}
