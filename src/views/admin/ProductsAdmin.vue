<template>
  <div class="card">
    <h1 class="text-2xl font-bold mb-4">Gestão de Produtos</h1>
    <DataTable :value="products" stripedRows tableStyle="min-width: 50rem">
      <Column field="id" header="Código (ID)"></Column>
      <Column field="name" header="Nome"></Column>
      <Column field="price" header="Preço">
        <template #body="slotProps">
          R$ {{ slotProps.data.price.toFixed(2).replace('.', ',') }}
        </template>
      </Column>
      <Column field="category.name" header="Categoria"></Column>
    </DataTable>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { Product } from '@/models/Product';
  import { Category } from '@/models/Category';
  
  export default defineComponent({
    data() {
      return {
        products: [
          new Product("1", "Guitarra massa dms", 2050.33, new Category(1, "Instrumentos musicais")),
          new Product("2", "Violão massa dms", 1200.00, new Category(1, "Instrumentos musicais")),
          new Product("3", "Cabo XLR 3m", 45.90, new Category(2, "Acessórios")),
        ]
      }
    }
  })
</script>