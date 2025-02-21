import { defineStore } from "pinia"
import { useCookie } from "#app"

export const useCounterStore = defineStore('counter', () => {
    const count = useCookie('count', { default: () => 0 }) // Armazena no cookie
    const name = ref('Eduardo')
    const doubleCount = computed(() => count.value * 2)
    const increment = () => {
      count.value++
    }

   
  
    return { count, name, doubleCount, increment }
  })


 