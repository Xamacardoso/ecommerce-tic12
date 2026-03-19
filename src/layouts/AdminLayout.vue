<template>
  <div class="flex min-h-screen bg-slate-100 dark:bg-slate-900">
    <!-- Sidebar Lateral Fixa -->
    <aside class="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 p-4 sticky top-0 h-screen overflow-y-auto">
      <div class="mb-8 flex items-center justify-center">
         <h1 class="text-xl font-bold text-amber-600">Admin Panel</h1>
      </div>
      <Menu :model="items" class="w-full border-none">
        <template #item="{ item, props }">
          <router-link v-if="item.route" :to="item.route" v-slot="{ href, navigate }" custom>
            <a :href="href" v-bind="props.action" @click="navigate" class="flex items-center">
              <span :class="item.icon"/>
              <span class="ml-2">{{ item.label }}</span>
            </a>
          </router-link>
          <a v-else :href="item.url" :target="item.target" v-bind="props.action">
            <span :class="item.icon"/>
            <span class="ml-2">{{ item.label }}</span>
          </a>
        </template>
      </Menu>
    </aside>

    <!-- Área de Conteúdo -->
    <main class="flex-1 p-8">
      <Breadcrumb :home="home" :model="breadcrumbs" class="mb-4 bg-transparent border-none p-0"/>
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router'; // Para saber a rota atual

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
      { label: 'Relatórios', icon: 'pi pi-chart-bar', route: '/admin/reports' }
    ]
  },
  {
      label: 'Sair',
      items: [
          { label: 'Voltar para Loja', icon: 'pi pi-shopping-bag', route: '/' }
      ]
  }
]);

const route = useRoute();
const home = ref({
  icon: 'pi pi-home',
  to: '/admin'
});

// Logica para transformar rotas em itens de breadcrumb
const breadcrumbs = computed(() => {
  return route.matched
    .filter(path => path.name) // filtrando só as que tem nome
    .map(path => {
      return {
        label: String(path.name).charAt(0).toUpperCase() + String(path.name).slice(1), // formatando o nome
        route: path.path
      }
    });
});
</script>
