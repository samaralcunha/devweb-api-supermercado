import { ObjectId } from 'mongodb';
import { Product } from '../../models/product';
import { HttpRequest, HttpResponse, IController } from '../protocols';
import { IUpdateProductRepository, UpdateProductParams } from './protocols';

export class UpdateProductController implements IController {
    constructor(private readonly updateProductRepository: IUpdateProductRepository) {}
    async handle(httpRequest: HttpRequest<UpdateProductParams>): Promise<HttpResponse<Product>> {
        const id = httpRequest.params.id;
        const body = httpRequest.body;
        try {
            if (!id) {
                return {
                    statusCode: 400,
                    body: 'Parâmetro id não foi encontrado',
                };
            }
            if (!ObjectId.isValid(id)) {
                return {
                    statusCode: 400,
                    body: 'id inválido',
                };
            }
            if (!body) {
                return {
                    statusCode: 400,
                    body: 'body não foi encontrado',
                };
            }
            const product = await this.updateProductRepository.updateProduct(id, body);

            return {
                statusCode: 200,
                body: product,
            };
        } catch (error) {
            return {
                statusCode: 500,
                body: `Erro interno do servidor: <br> ${error}`,
            };
        }
    }
}
