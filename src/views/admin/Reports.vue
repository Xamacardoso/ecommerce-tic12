<template>
  <div class="card p-4">
    <h1 class="text-2xl font-bold mb-4">Relatórios de Vendas</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card class="bg-blue-50">
        <template #title>Total de Vendas</template>
        <template #content><p class="text-3xl font-bold text-blue-700">R$ 15.240,00</p></template>
      </Card>
      <Card class="bg-green-50">
        <template #title>Pedidos Realizados</template>
        <template #content><p class="text-3xl font-bold text-green-700">142</p></template>
      </Card>
    </div>
  </div>
</template>
