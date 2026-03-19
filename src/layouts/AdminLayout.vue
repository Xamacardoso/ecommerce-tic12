<template>
  <div class="flex min-h-screen bg-slate-100 dark:bg-slate-900">
    <!-- Sidebar Lateral Fixa -->
    <aside class="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 p-4 sticky top-0 h-screen overflow-y-auto">
      <div class="mb-8 flex items-center justify-center">
         <h1 class="text-xl font-bold text-amber-600">Admin Panel</h1>
      </div>
      <Menu :model="items" class="w-full border-none" />
    </aside>

    <!-- Área de Conteúdo -->
    <main class="flex-1 p-8">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const items = ref([
  {
    label: 'Dashboard',
    items: [
      { label: 'Estatísticas', icon: 'pi pi-chart-line', route: '/admin/dashboard' },
      { label: 'Visão Geral', icon: 'pi pi-eye', route: '/admin/dashboard' }
    ]
  },
  {
    label: 'Gestão',
    items: [
      { label: 'Produtos', icon: 'pi pi-box', route: '/admin/products' },
      { label: 'Categorias', icon: 'pi pi-tags', route: '/admin/categories' }
    ]
  },
  {
      label: 'Sair',
      items: [
          { label: 'Voltar para Loja', icon: 'pi pi-shopping-bag', route: '/' }
      ]
  }
]);
</script>
