<template>
    <div class="p-8">
        <h1 class="text-3xl font-bold mb-6">Carrinho de Compras</h1>
        <div v-if="cartItems.products.length > 0" class="flex flex-col gap-6"></div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Cart } from '@/models/Cart';
import { Product } from '@/models/Product';
import { Category } from '@/models/Category';

// Instancia do carrinho
const cartItems = ref(new Cart());

const dummyProduct = new Product(
    '1',
    'Guitarrona',
    1000,
    new Category(1, 'Instrumentos')
);

// Adiciona o produto ao carrinho
cartItems.value.addItem(dummyProduct);
</script>

<style></style>