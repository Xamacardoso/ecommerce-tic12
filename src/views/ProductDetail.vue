<template>
    <div v-if="product?.id">
        <ProductCard :product="product" />
    </div>
    <div v-else>
        <h1>Produto não encontrado</h1>
    </div>
</template>

<script lang="ts">
import { Category } from '@/models/Category';
import { Product } from '@/models/Product';
import { defineComponent } from 'vue';
import ProductCard from '@/components/card/ProductCard.vue';

export default defineComponent({
    name: 'ProductDetail',
    data() {
        return {
            productId: this.$route.params.id,
            product: {} as Product | undefined
        }
    },

    components: {
        ProductCard
    },

    methods: {
        async getProduct() {
            const product = [
                new Product('1', 'Guitarrona', 1000, new Category(1, 'Instrumentos'))
            ].find((product) => product.id === this.productId);

            this.product = product;
            console.log(this.product);
        }
    },

    // quando o componente é montado (carregado), ele chama o método getProduct
    mounted() {
        this.getProduct()
    }
})
</script>

<style></style>