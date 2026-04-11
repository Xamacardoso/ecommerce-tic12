import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0) // state: o estado é a variável que guarda o valor
  const doubleCount = computed(() => count.value * 2) // getters: os getters são funções que retornam o valor do estado
  function increment() { // actions: as actions são funções que modificam o estado
    count.value++
  }

  return { count, doubleCount, increment } // retorna as variáveis e funções que serão usadas no componente
})

