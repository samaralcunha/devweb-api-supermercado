import { Product } from '../../models/product';
import { HttpRequest, HttpResponse, IController } from '../protocols';
import { CreateProductParams, ICreateProductRepository } from './protocols';

export class CreateProductController implements IController {
    constructor(private readonly createProductRepository: ICreateProductRepository) {}
    async handle(httpRequest: HttpRequest<CreateProductParams>): Promise<HttpResponse<Product>> {
        try {
            if (!httpRequest.body) {
                return {
                    statusCode: 400,
                    body: 'Body da requisição não foi encontrado',
                };
            }
            const requiredFiels = ['nome', 'preco', 'categoria', 'quantidade', 'desconto'];
            for (const field of requiredFiels) {
                if (!httpRequest.body[field as keyof CreateProductParams].toString().length) {
                    return {
                        statusCode: 400,
                        body: `Campo ${field} não foi informado`,
                    };
                }
            }
            const { body } = httpRequest;
            const product = await this.createProductRepository.createProduct(body);
            return {
                statusCode: 201,
                body: product,
            };
        } catch (error) {
            return {
                statusCode: 500,
                body: 'Erro no CreateProductController',
            };
        }
    }
}
