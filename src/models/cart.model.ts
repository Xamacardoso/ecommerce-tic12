import type { Product } from "./product.model";

interface CartItem {
    product: Product,
    quantity: number
}

export class Cart {
    constructor(
        public products: CartItem[] = [],
        public totalItems: number = 0,
    ) {}
}