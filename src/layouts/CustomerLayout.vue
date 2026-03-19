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
        </Menubar>
        <div class="flex-1">
            <RouterView />
        </div>
    </div>
</template>

<script setup lang="ts">
// um script setup é um script que é executado no momento da montagem do componente
import { ref } from 'vue';

const items = ref([
    { label: 'Home', icon: 'pi pi-home', route: '/' },
    { label: 'Produtos', icon: 'pi pi-box', route: '/products' },
    { label: 'Carrinho', icon: 'pi pi-shopping-cart', route: '/checkout' },
]);

</script>

<style></style>