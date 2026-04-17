<template>
    <h1 @click="toggleShow">Carrinho</h1>
    <article v-if="show" class="absolute top-20 right-20 bg-white border p-4 min-h-[40px] w-96">
        <div v-if="cartStore.existsItems">
            <div v-for="item in cartStore.cartItems" :key="item.product.id">
                <div class="border p-4">
                    <p>{{ item.product.name }}</p>
                    <p>{{ item.product.price }}</p>
                    <span>
                        <Button @click="decrementItemAtCart(item.product)" label="-"></Button>
                        {{ item.quantity }}
                        <Button @click="addItemToCart(item.product)" label="+"></Button>
                    </span>
                </div>
            </div>
        </div>
        <div v-else>
            <p>Carrinho vazio</p>
        </div>
    </article>
</template>

<script lang="ts">
import type { Product } from '@/models/Product';
import { useCartStore } from '@/stores/cartStore';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'CartComponent',
    setup() {
        const cartStore = useCartStore();
        return {
            cartStore
        }
    },
    data() {
        return {
            show: false
        }
    },
    methods: {
        toggleShow() {
            this.show = !this.show;
        },

        addItemToCart(product: Product) {
            this.cartStore.addProduct(product);
        },

        removeItemAtCart(product: Product) {
            this.cartStore.removeProduct(product);
        },

        decrementItemAtCart(product: Product) {
            this.cartStore.decrementProduct(product);
        },
    }
})
</script>