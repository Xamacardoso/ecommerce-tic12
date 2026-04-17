<template>
    <main class="flex flex-col items-center justify-center w-screen h-screen">
        <form class="flex flex-col gap-2 max-w-[400px] border p-8" @submit.prevent="loginUser">
            <header>{{ "Faça seu login" }}</header>
            <label for="email" class="flex flex-col gap-2">
                Email
                <InputText v-model="form.email" />
                <Error :value="v$.form" :field="'email'" />
            </label>
            <label for="password" class="flex flex-col gap-2">
                Senha
                <Password v-model="form.password" :feedback="false" :toggleMask="true"/>
                <Error :value="v$.form" :field="'password'" />
            </label>
            <Button type="submit" :loading="loading">Login</Button>
        </form>
    </main>
</template>

<script lang="ts">
import useVuelidate from '@vuelidate/core';
import { defineComponent } from 'vue';
import { required, minLength, maxLength, email } from '@vuelidate/validators';
import Error from '@/components/Error.vue';
import LoginForm from '@/models/login.model';

export default defineComponent({
    name: "Login",
    data() {
        return {
            loading: false,
            form: new LoginForm()
        }
    },
    setup() {
        return {
            v$: useVuelidate()
        }
    },
    validations() {
        return {
            form: {
                email: {
                    required,
                    email
                },
                password: {
                    required,
                    minLength: minLength(6),
                    maxLength: maxLength(100)
                }
            }
        }
    },
    methods: {
        async loginUser() {
            // Redireciona para a pagina principal para testes
            const isValid = await this.v$.$validate();
            
            if (!isValid) {
                console.log("Login falhou")
                return;
            }

            // this.loading = true;
            this.$router.push({ path: "/" });
        }
    },
    components: {
        Error
    }
})
</script>