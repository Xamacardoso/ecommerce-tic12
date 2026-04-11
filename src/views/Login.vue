<template>
    <main class="flex flex-col items-center justify-center w-screen h-screen">
        <form class="flex flex-col gap-2 max-w-[400px] border p-8">
            <header>{{ "Faça seu login" }}</header>
            <label for="email" class="flex flex-col gap-2">
                Email
            </label>
            <label for="password" class="flex flex-col gap-2">
                Senha
            </label>
            <Button type="submit">Login</Button>
        </form>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: "Login",
    data() {
        return {
            
        }
    },
    setup() {
        
    },
    methods: {
        
    },
    components: {
        
    }
})
</script>