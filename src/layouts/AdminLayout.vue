<template>
  <div class="flex flex-row min-h-screen">
    <aside class="w-40 bg-amber-800 p-2">
      <ul class="flex flex-col gap-2">
        <li v-for="(item, index) in items" :key="index" @click="item.command" class="p-4">
          {{ item.label }}
        </li>
      </ul>
    </aside>
    <div class="flex-1 min-h-screen">
      <RouterView />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  data() {
    return {
      items: [
        {
          label: 'Dashboard',
          command: () => this.$router.push('/admin'),
        },
        {
          label: 'Products',
          command: () => this.$router.push('/admin/products'),
        },
      ],
    }
  },
})
</script>