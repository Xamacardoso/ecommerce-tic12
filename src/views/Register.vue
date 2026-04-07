<template>
    <main class="flex flex-col items-center justify-center w-screen h-screen">
        <form class="flex flex-col gap-2 max-w-[400px] border p-8" @submit.prevent="registerUser">
            <header>{{ "Faça seu cadastro" }}</header>
            <label for="name" class="flex flex-col gap-2">
                Nome
                <!-- v-model faz a ligação entre o input e a variável do data. gerencia o estado do input -->
                <InputText v-model="form.name" />
                <Error :value="v$.form" :field="'name'" />
            </label>
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
            <label for="confirmPassword" class="flex flex-col gap-2">
                Confirmar Senha
                <Password v-model="form.confirmPassword" :feedback="false" :toggleMask="true"/>
                <Error :value="v$.form" :field="'confirmPassword'" />
            </label>
            <Button type="submit" :loading="loading">Cadastrar</Button>
        </form>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import RegisterForm from '@/models/register.model';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, maxLength, email, sameAs } from '@vuelidate/validators';
import { UserRegisterRest } from '@/services/rest/userRegister.rest';
import Error from '@/components/Error.vue';

export default defineComponent({
    name: "Register",
    data() {
        return {
            form: new RegisterForm(),
            rest: new UserRegisterRest(),
            loading: false
        }
    },
    // setup é uma função que é chamada antes de criar o componente. É aqui que vamos colocar o vuelidate, que é uma biblioteca de validação de formulários
    setup() {
        return {
            v$: useVuelidate()
        }
    },

    // Validacoes do formulario
    validations() {
        return {
            form: {
                name: {
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(100)
                },
                email: {
                    required,
                    email
                },
                password: {
                    required,
                    minLength: minLength(6),
                    maxLength: maxLength(100)
                },
                confirmPassword: {
                    required,
                    minLength: minLength(6),
                    maxLength: maxLength(100),
                    sameAs: sameAs(this.form.password)
                }
            }
        }
    },

    methods: {
        async registerUser() {
            const isValid = await this.v$.$validate();
            if (!isValid) {
                console.log("requisicao falhou")
                return;
            }

            // Monta o body para a requisicao
            const body = {
                name: this.form.name,
                email: this.form.email,
                password: this.form.password
            };

            // Faz a requisicao
            console.log("REquisicao de usuario");
            this.loading = true;
            this.rest.registerUser(body)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    },

    components: {
        Error
    }
})
</script>