import type { Product } from "./product.ts";

interface CartItem {
    product: Product,
    quantity: number
}

export class Cart {
    constructor(
        public products: CartItem[] = [],
        public totalItems: number = 0,
    ) {}

    addItem(product: Product) {
        const productAlreadyExists = this.products.some((item) => item.product.id === product.id);
        
        // se ja existir, incrementa a quantidade, senao adiciona o produto ao carrinho 
        if (productAlreadyExists) {
            this.products.find((item) => item.product.id === product.id)!.quantity += 1;
        } else {
            this.products.push({ product, quantity: 1 });
        }

        this.totalItems += 1;
    }

    decrementItem(product: Product) {
        // verifica se o produto existe no carrinho
        const productIndex = this.products.findIndex((item) => item.product.id === product.id);
        
        if (productIndex !== -1) {
            // se a quantidade for maior que 1, decrementa, senao remove o item do carrinho
            if (this.products[productIndex]!.quantity > 1) {
                this.products[productIndex]!.quantity -= 1;
                this.totalItems -= 1;
            } else {
                this.removeItem(product);
            }
        }
    }

    removeItem(product: Product) {
        // verifica se o produto existe no carrinho
        const productIndex = this.products.findIndex((item) => item.product.id === product.id);
        
        if (productIndex !== -1) {
            // retira a quantidade que tinha dos totais do carrinho, e depois remove o item em si
            this.totalItems -= this.products[productIndex]!.quantity;
            this.products.splice(productIndex, 1);
        }
    }

    getTotalItemsValue() {
        return this.products.reduce((total, item) => total + item.product.price * item.quantity, 0);
    }
}