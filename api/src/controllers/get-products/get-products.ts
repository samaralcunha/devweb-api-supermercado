import { IController } from '../protocols';
import { IGetProductRepository } from './protocols';

export class GetProductController implements IController {
    constructor(private readonly getProductReposiory: IGetProductRepository) {}
    async handle() {
        try {
            const products = await this.getProductReposiory.getProducts();
            return {
                statusCode: 200,
                body: products,
            };
        } catch (error) {
            return {
                statusCode: 500,
                body: 'Erro ao comunicar com o banco: ' + error,
            };
        }
    }
}
