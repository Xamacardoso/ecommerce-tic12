
// logica
<script lang="ts">
  import { Product } from './models/product.model';
  import ProductCard from './components/card/ProductCard.vue';
  import { Cart } from './models/cart.model';

  export default {
    // objetos com partes reativas do componente
    data() {
      return {
        cart: new Cart(),
        products: [
          new Product("Guitarra", "Guitarra massa dms", 20.33, 0.2),
          new Product("Violão", "Violão massa dms", 2023.33, 0.1),
        ]
      }
    },
    
    // metodos q podem ser chamados pelo template
    methods: {
      addItem(product: Product) {
        const productAlreadyExists = this.cart
          .products
          .some((item) => item.product.title === product.title);
        
        // se o produto ja existe no carrinho, incrementa a quantidade, senao adiciona o produto ao carrinho
        if (productAlreadyExists) {
          this.cart.products
            .find((item) => item.product.title === product.title)!.quantity += 1; 
        } else {
          this.cart.products.push({ product, quantity: 1 });
        }

        this.cart.totalItems += 1;
      },

      decItem() {
        this.cart.totalItems -= 1;
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
      <h3>{{ item.product.title }}</h3>
      <p>Quantidade: {{ item.quantity }}</p>
    </div>
    <p>Total de itens: {{ cart.totalItems }}</p>
  </div>
</template>

// equivalente ao css, estilizacao do componente
<style></style>