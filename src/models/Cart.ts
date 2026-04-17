import type { Product } from "./Product.ts";

export interface ICartItem {
    product: Product,
    quantity: number
}

export class Cart {
    constructor(
        public cartItems: ICartItem[] = [],
        public totalItems: number = 0,
    ) { }

    addItem(product: Product) {
        const productAlreadyExists = this.cartItems.some((item) => item.product.id === product.id);

        // se ja existir, incrementa a quantidade, senao adiciona o produto ao carrinho 
        if (productAlreadyExists) {
            this.cartItems.find((item) => item.product.id === product.id)!.quantity += 1;
        } else {
            this.cartItems.push({ product, quantity: 1 });
        }

        this.totalItems += 1;
    }

    decrementItem(productId: string) {
        // verifica se o produto existe no carrinho
        const productIndex = this.cartItems.findIndex((item) => item.product.id === productId);

        if (productIndex !== -1) {
            // se a quantidade for maior que 1, decrementa, senao remove o item do carrinho
            if (this.cartItems[productIndex]!.quantity > 1) {
                this.cartItems[productIndex]!.quantity -= 1;
                this.totalItems -= 1;
            } else {
                this.removeItem(productId);
            }
        }
    }

    removeItem(productId: string) {
        // verifica se o produto existe no carrinho
        const productIndex = this.cartItems.findIndex((item) => item.product.id === productId);

        if (productIndex !== -1) {
            // retira a quantidade que tinha dos totais do carrinho, e depois remove o item em si
            this.totalItems -= this.cartItems[productIndex]!.quantity;
            this.cartItems.splice(productIndex, 1);
        }
    }

    getTotalItemsValue() {
        return this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
    }
}