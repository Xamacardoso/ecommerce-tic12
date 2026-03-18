
// logica
<script lang="ts">
import { Product } from '@/models/Product.ts';
import { Category } from '@/models/Category.ts';
import ProductCard from '@/components/card/ProductCard.vue';
import CartItem from '@/components/card/CartItem.vue';
import { Cart } from '@/models/Cart.ts';

  export default {
    // objetos com partes reativas do componente
    data() {
      return {
        cart: new Cart(),
        products: [
          new Product("1", "Guitarra massa dms", 20.33, new Category(1, "Instrumentos musicais")),
          new Product("2", "Violão massa dms", 2023.33, new Category(1, "Instrumentos musicais")),
        ]
      }
    },
    
    // metodos q podem ser chamados pelo template
    methods: {
      addItem(product: Product) {
        this.cart.addItem(product);
      },

      updateQuantity(payload: { product: Product, quantity: number }) {
        // 1. acha o item no carrinho
        const item = this.cart.products.find((item) => item.product.id === payload.product.id);
        
        // 2. calcula diferenca para atualizar o totalitems geral
        if (item) {
          const diff = payload.quantity - item.quantity;
          
          // 3. atualiza a quantidade do item no carrinho
          item.quantity = payload.quantity;
          this.cart.totalItems += diff;
          
          // 4. se a quantidade chegar a zero, remove o item do carrinho
          if (payload.quantity === 0) {
            this.cart.removeItem(payload.product);
          }
        }
      },

      removeItem(product: Product) {
        this.$confirm.require({
          header: 'Remover Produto do Carrinho',
          message: 'Tem certeza que deseja remover o produto do carrinho?',
          icon: 'pi pi-exclamation-triangle',
          rejectLabel: 'Cancelar',
          acceptLabel: 'Remover',

          rejectProps: {
            label: 'Não, manter',
            severity: 'secondary',
            outlined: true
          },

          acceptProps: {
            label: 'Sim, remover',
            severity: 'danger',
          },

          // Acoes finais
          accept: () => {
            this.cart.removeItem(product);
          },
        })
      },

      toggleDarkMode(){
        document.documentElement.classList.toggle('dark');
      },

      goToDetail(product: Product){
        this.$router.push({path: `/products/${product.id}`})
      }
    },

    components: {
      ProductCard,
      CartItem
    }
  }
</script>

// equivalente ao html do componente
<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-slate-50 transition-colors duration-300 p-8 sm:p-12 max-w-full overflow-x-hidden">
    <div class="max-w-6xl mx-auto flex flex-col gap-12">
    <main>
      <h1 class="text-center text-2xl font-bold mb-4">Vitrine de produtos</h1>
      <Button icon="pi pi-moon" severity="secondary" rounded text @click="toggleDarkMode" label="Tema"/>
      <!-- v-for é usado para iterar sobre uma lista de elementos. key é usado para identificar cada elemento, e product é a variavel que vai receber cada elemento da lista -->
     <section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
       <div v-for="product in products" :key="product.id">
         <!-- :product é usado para passar uma propriedade para o componente filho, e @add-to-cart é usado para receber um evento do componente filho -->
          <div @click="goToDetail(product)">
            <ProductCard :product="product" @add-to-cart="addItem"/>
          </div>
       </div>
     </section>
  </main>
  <div class="flex flex-col gap-4">
    <div v-if="cart.products.length > 0" class="flex items-center justify-start" >
      <DataView :value="cart.products" class="w-1/2">
        <template #header>
          <h1 class="text-center text-xl">Carrinho</h1>
        </template>
        <template #list="slotProps">
          <div class="flex flex-col gap-4">
            <CartItem v-for="item in slotProps.items" :key="item.product.id" :cartItem="item" @remove-item="removeItem" @update-quantity="updateQuantity"/>
          </div>
        </template>
      </DataView>
    </div>
    <div v-else class="flex items-center justify-center">
      <Card class="border border-slate-500 bg-slate-400 rounded-xl flex items-center justify-center h-64 w-1/2">
        <template #content>
          <h1 class="text-center text-xl">Carrinho vazio, vamos comprar algo!</h1>
        </template>
      </Card>
    </div>
    <p>Total de itens: {{ cart.totalItems }}</p>
    <p>Valor total no carrinho: R$ {{ cart.getTotalItemsValue().toFixed(2).replace('.', ',') }}</p>
  </div>
  </div>
  </div>
  <ConfirmDialog />
</template>

// equivalente ao css, estilizacao do componente
<style></style>