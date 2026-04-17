
// logica
<script lang="ts">
  import ProductCard from '@/components/card/ProductCard.vue';
import { Category } from '@/models/Category';
import { Product } from '@/models/Product';
import { QueryParams } from '@/models/queryParams.model';
import { ProductRest } from '@/services/rest/product.rest';
import { useCartStore } from '@/stores/cartStore';
import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'Products',
    data() {
      return {
        rest: new ProductRest(),
        params: new QueryParams(),
        products: [] as Product[],
        loading: {
          products: false
        }
      }
    },
    methods: {
      async getAllProducts() {
        this.loading.products = true;
        const response = await this.rest.getAllProducts(this.params)
          .then((response) => {
            this.products = response.data;
            this.params = { page: response.page, limit: response.limit };
          })
          .catch((error) => {
            console.log("Erro ao buscar produtos");
          })
          .finally(() => {
            this.loading.products = false;
          });

          const mockCategory = new Category(1, 'Categoria 1');

          this.products = [
            new Product('1', 'Produto 1', 10.00, mockCategory),
            new Product('2', 'Produto 2', 20.00, mockCategory),
            new Product('3', 'Produto 3', 30.00, mockCategory),
            new Product('4', 'Produto 4', 40.00, mockCategory),
            new Product('5', 'Produto 5', 50.00, mockCategory),
            new Product('6', 'Produto 6', 60.00, mockCategory),
            new Product('7', 'Produto 7', 70.00, mockCategory),
            new Product('8', 'Produto 8', 80.00, mockCategory),
            new Product('9', 'Produto 9', 90.00, mockCategory),
            new Product('10', 'Produto 10', 100.00, mockCategory),
          ]
        
          console.log('Requisicao de produtos concluida');
      },
      async addToCart(product: Product) {
        console.log(product);
        this.cartStore.addProduct(product);
      }
    },
    mounted() {
      this.getAllProducts();
    },
    components: {
      ProductCard
    },
    setup() {
      const cartStore = useCartStore();
      return {
        cartStore
      }
    }
  })
</script>

<template>
  <main class="h-screen bg-amber-400">
    <h1>Products</h1>
    
    <div v-if="loading.products">
      <p>Carregando produtos...</p>
    </div>
    <div v-else>
      <div v-if="products.length > 0" class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="product in products" :key="product.id">
          <ProductCard :product="product" @add-to-cart="addToCart"/>
        </div>
      </div>
      <div v-else>
        <p>Nenhum produto encontrado</p>
      </div>
    </div>
  </main>
</template>

<style></style>