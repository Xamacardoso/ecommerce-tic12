import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { Cart } from "@/models/Cart";
import type { Product } from "@/models/Product";

export const useCartStore = defineStore('cart', () => {
    // Instanciando o carrinho de forma reativa
    const cart = ref<Cart>(new Cart());

    // Getters (Computados, significa que dependem de outros valores e sao reativos)
    const totalItems = computed(() => cart.value.totalItems);
    const cartItems = computed(() => cart.value.cartItems);
    const cartTotalValue = computed(() => cart.value.getTotalItemsValue());
    const existsItems = computed(() => cart.value.cartItems.length > 0);

    // Actions (metodos que alteram o estado)
    function addProduct(product: Product) {
        cart.value.addItem(product);
    }

    function removeProduct(product: Product) {
        cart.value.removeItem(product.id);
    }

    function decrementProduct(product: Product) {
        cart.value.decrementItem(product.id);
    }

    return {
        cart,
        totalItems,
        cartItems,
        cartTotalValue,
        existsItems,
        addProduct,
        removeProduct,
        decrementProduct
    }
})