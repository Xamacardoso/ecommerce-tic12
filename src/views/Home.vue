
// logica
<script lang="ts">
import { Product } from '@/models/Product.ts';
import { Category } from '@/models/Category.ts';
import ProductCard from '@/components/card/ProductCard.vue';
import CartItem from '@/components/card/CartItem.vue';
import { Cart } from '@/models/Cart.ts';
import { useCartStore } from '@/stores/cartStore';
import { mapState, mapActions } from 'pinia';

  export default {
    // objetos com partes reativas do componente
    data() {
      return {
        products: [
          new Product("1", "Guitarra massa dms", 20.33, new Category(1, "Instrumentos musicais")),
          new Product("2", "Violão massa dms", 2023.33, new Category(1, "Instrumentos musicais")),
        ]
      }
    },
    
    computed: {
      // Traz as variaveis da store para dentro desse componente
      ...mapState(useCartStore, ['cart', 'totalItems', 'cartTotalValue']),
    },
    
    // metodos q podem ser chamados pelo template
    methods: {
      // Traz as funcoes da store para ca
      ...mapActions(useCartStore, ['addProduct', 'removeProduct', 'decrementProduct']),

      addItem(product: Product) {
        this.addProduct(product);
      },

      updateQuantity(payload: { product: Product, quantity: number }) {
        // 1. acha o item no carrinho
        const item = this.cart.products.find((item) => item.product.id === payload.product.id);
        
        // 2. calcula diferenca para atualizar o totalitems geral
        if (item) {
          const diff = payload.quantity - item.quantity;
          
          // 3. atualiza a quantidade do item no carrinho
          if (diff > 0) {
            for (let i = 0; i < diff; i++) {
              this.addProduct(payload.product);
            }
          } else {
            for (let i = 0; i < Math.abs(diff); i++) {
              this.decrementProduct(payload.product);
            }
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
            this.removeProduct(product); // agora usa a store
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
       <div v-for="product in products" :key="product.id" class="relative group h-full">
         <!-- link invisivel que cobre o card inteiro -->
         <!-- absolute inset-0 faz preencher 100% da area do card pai -->

         <!-- :product é usado para passar uma propriedade para o componente filho, e @add-to-cart é usado para receber um evento do componente filho -->
         <router-link :to="`/products/${product.id}`" class="absolute inset-0 z-10" aria-label="Ver Detalhes do Produto"/>

         <!-- o componente product card nao tem z index, entao ele fica por baixo do link, por isso precisamos colocar o link como absolute e com z index 10 -->
           <ProductCard :product="product" @add-to-cart="addItem"/>
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
    <p>Total de itens: {{ totalItems }}</p>
    <p>Valor total no carrinho: R$ {{ cartTotalValue.toFixed(2).replace('.', ',') }}</p>
  </div>
  </div>
  </div>
  <ConfirmDialog />
</template>

// equivalente ao css, estilizacao do componente
<style></style>