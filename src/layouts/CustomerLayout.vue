<template>
    <div class="flex flex-col min-h-screen">
        <Menubar :model="items" class="p-4 flex flex-row items-center gap-4">
            <template #item="{ item, props }">
                <RouterLink :to="item.route" v-slot="{ href, navigate}" custom>
                    <a :href="href" v-bind="props.action" @click="navigate">
                        <span :class="item.icon"/>
                        <span class="ml-2">{{ item.label }}</span>
                    </a>
                </RouterLink>
            </template>

            <!-- Area para o carrinho -->
            <template #end>
                <router-link to="/checkout" class="flex items-center gap-3 p-2 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer no-underline text-inherit">
                    <i class="pi pi-shopping-cart text-xl" />
                    <span class="font-bold hidden sm:inline">Carrinho ({{ totalItems }})</span>
                </router-link>
            </template>

        </Menubar>
        <div class="flex-1">
            <Breadcrumb :home="home" :model="breadcrumbs" class="mb-4 bg-transparent border-none p-0"/>
            <RouterView />
        </div>
    </div>
</template>

<script setup lang="ts">
// um script setup é um script que é executado no momento da montagem do componente
import { ref, computed } from 'vue';
import { useCartStore } from '@/stores/cartStore';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';

const cartStore = useCartStore();
const { totalItems, cartTotalValue } = storeToRefs(cartStore);

const items = ref([
    { label: 'Home', icon: 'pi pi-home', route: '/' },
    { label: 'Produtos', icon: 'pi pi-box', route: '/products' },
]);

const route = useRoute();
const home = ref({
  icon: 'pi pi-home',
  to: '/'
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

<style></style>