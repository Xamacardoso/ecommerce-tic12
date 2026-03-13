
// logica
<script lang="ts">
import { Product } from './models/product.ts';
import { Category } from './models/Category.ts';
import ProductCard from './components/card/ProductCard.vue';
import { Cart } from './models/Cart.ts';

  export default {
    // objetos com partes reativas do componente
    data() {
      return {
        cart: new Cart(),
        products: [
          new Product("Guitarra", "Guitarra massa dms", 20.33, new Category(1, "Instrumentos musicais")),
          new Product("Violão", "Violão massa dms", 2023.33, new Category(1, "Instrumentos musicais")),
        ]
      }
    },
    
    // metodos q podem ser chamados pelo template
    methods: {
      addItem(product: Product) {
        this.cart.addItem(product);
      },

      decItem(product: Product) {
        this.cart.decrementItem(product);
      },

      removeItem(product: Product) {
        this.cart.removeItem(product);
      }
    },

    components: {
      ProductCard
    }
  }
</script>

// equivalente ao html do componente
<template>
  <main>
    <!-- v-for é usado para iterar sobre uma lista de elementos. key é usado para identificar cada elemento, e product é a variavel que vai receber cada elemento da lista -->
    <div v-for="product in products ">
      <!-- :product é usado para passar uma propriedade para o componente filho, e @add-to-cart é usado para receber um evento do componente filho -->
      <ProductCard :product="product" @add-to-cart="addItem"/>
    </div>
  </main>
  <div>
    <h1>Carrinho</h1>
    <div v-for="item in cart.products">
      <h3>{{ item.product.name }} x{{ item.quantity }}</h3>
      <button @click="addItem(item.product)">+</button>
      <button @click="decItem(item.product)">-</button>
      <button @click="removeItem(item.product)">Remover</button>
    </div>
    <p>Total de itens: {{ cart.totalItems }}</p>
    <p>Valor total no carrinho: R$ {{ cart.getTotalItemsValue().toFixed(2).replace('.', ',') }}</p>
  </div>
</template>

// equivalente ao css, estilizacao do componente
<style></style>