import { Category } from "./Category";

export class Product {
    constructor(
        public id: string,
        public name: string,
        public price: number,
        public category: Category,
    ) {}
}