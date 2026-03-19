<template>
    <Card
        :style="{
            width: '100%',
            minWidth: '200px',
            maxWidth: '320px',
        }"
        class="p-4 shadow-lg rounded-xl"
    >
        <template #header>
            <img src="https://picsum.photos/200" alt="Foto do produto">
        </template>

        <template #title>
            <h1>{{ product.name }}</h1>
        </template>

        <template #content>
            <p>Preço: R$ {{ product.price.toFixed(2).replace('.', ',') }}</p>
            <p>Categoria: {{ product.category.name }}</p>
        </template>

        <template #footer>
            <div class="flex flex-row-reverse relative z-20">
                <Button label="Adicionar ao carrinho" @click.stop="addToCart(product)" />
            </div>
        </template>
    </Card>
</template>

<script lang="ts">
import { Product } from '@/models/Product.ts';
import { Category } from '@/models/Category.ts';
import { defineComponent, type PropType } from 'vue';

// definindo as propriedades que o componente vai receber do componente pai
export default defineComponent({
    name: 'ProductCard',
    props: {
        product: {
            type: Object as PropType<Product>, // propType é usado para tipar as propriedades do componente, servindo como um "type" para as propriedades
            default: new Product("", "", 0, new Category(0, "")), // o default é só para caso o componente pai não passe nenhuma propriedade
            required: true   
        }
    },
    // emits indica os eventos que ele vai emitir para o componente pai, que são usados para comunicar entre componentes
    emits: ['add-to-cart'],
    methods: {
        addToCart(item: Product) {
            this.$emit('add-to-cart', item);
        }
    }
    
})
</script>
