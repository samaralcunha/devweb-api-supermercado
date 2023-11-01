import { ObjectId } from 'mongodb';
import { Product } from '../../models/product';
import { HttpRequest, HttpResponse, IController } from '../protocols';
import { IDEleteProductRepository } from './protocols';

export class DeleteProductController implements IController {
    constructor(private readonly deleteProductRepository: IDEleteProductRepository) {}
    async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<Product>> {
        try {
            const id = httpRequest.params.id;
            if (!id) {
                return {
                    statusCode: 400,
                    body: 'Parâmetro id não foi encontrado',
                };
            }
            if (!ObjectId.isValid(id)) {
                return {
                    statusCode: 400,
                    body: 'Id inválido',
                };
            }
            const product = await this.deleteProductRepository.deleteProduct(id);
            return {
                statusCode: 200,
                body: product,
            };
        } catch (error) {
            return {
                statusCode: 500,
                body: 'Erro no DeleteProductController',
            };
        }
    }
}
