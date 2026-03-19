import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { Cart } from "@/models/Cart";
import type { Product } from "@/models/Product";

export const useCartStore = defineStore('cart', () => {
    // Instanciando o carrinho de forma reativa
    const cart = ref<Cart>(new Cart());

    // Getters (Computados, significa que dependem de outros valores e sao reativos)
    const totalItems = computed(() => cart.value.totalItems);
    const cartProducts = computed(() => cart.value.products);
    const cartTotalValue = computed(() => cart.value.getTotalItemsValue());

    // Actions (metodos que alteram o estado)
    function addProduct(product: Product) {
        cart.value.addItem(product);
    }

    function removeProduct(product: Product) {
        cart.value.removeItem(product);
    }

    function decrementProduct(product: Product) {
        cart.value.decrementItem(product);
    }

    return {
        cart,
        totalItems,
        cartProducts,
        cartTotalValue,
        addProduct,
        removeProduct,
        decrementProduct
    }
})