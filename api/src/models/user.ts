export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface Product {
    id: string;
    nome: string;
    preco: number;
    categoria: string;
    quantidade: number;
    desconto: number;
}
