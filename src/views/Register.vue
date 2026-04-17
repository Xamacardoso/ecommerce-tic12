<template>
    <main class="flex flex-col items-center justify-center min-h-screen bg-neutral-50 px-4">
        <Toast />
        <Card class="w-full max-w-md shadow-lg my-8">
            <template #title>
                <div class="text-2xl font-bold text-center text-neutral-800">Crie sua conta</div>
            </template>
            <template #content>
                <form class="flex flex-col gap-4" @submit.prevent="registerUser">
                    <div class="flex flex-col gap-2">
                        <label for="name" class="font-medium">Nome Completo</label>
                        <InputText id="name" v-model="form.name" :class="{'p-invalid': v$.form.name.$error}" placeholder="Seu nome" />
                        <Error :value="v$.form" field="name" />
                    </div>

                    <div class="flex flex-col gap-2">
                        <label for="email" class="font-medium">Email</label>
                        <InputText id="email" v-model="form.email" :class="{'p-invalid': v$.form.email.$error}" placeholder="exemplo@email.com" />
                        <Error :value="v$.form" field="email" />
                    </div>

                    <div class="flex flex-col gap-2">
                        <label for="password" class="font-medium">Senha</label>
                        <Password id="password" v-model="form.password" :class="{'p-invalid': v$.form.password.$error}" :toggleMask="true" placeholder="Mínimo 6 caracteres" />
                        <Error :value="v$.form" field="password" />
                    </div>

                    <div class="flex flex-col gap-2">
                        <label for="confirmPassword" class="font-medium">Confirmar Senha</label>
                        <Password id="confirmPassword" v-model="form.confirmPassword" :class="{'p-invalid': v$.form.confirmPassword.$error}" :feedback="false" :toggleMask="true" placeholder="Repita sua senha" />
                        <Error :value="v$.form" field="confirmPassword" />
                    </div>

                    <Button type="submit" :loading="authStore.loading" class="w-full mt-2" label="Cadastrar" icon="pi pi-user-plus" />
                    
                    <div class="text-center mt-4 text-sm text-neutral-600">
                        Já tem uma conta? 
                        <router-link to="/login" class="text-primary font-bold hover:underline">Faça login</router-link>
                    </div>
                </form>
            </template>
        </Card>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, email, sameAs } from '@vuelidate/validators';
import Error from '@/components/Error.vue';
import RegisterForm from '@/models/register.model';
import { useAuthStore } from '@/stores/auth';

export default defineComponent({
    name: "Register",
    components: { Error },
    setup() {
        return {
            v$: useVuelidate(),
            authStore: useAuthStore()
        }
    },
    data() {
        return {
            form: new RegisterForm()
        }
    },
    validations() {
        return {
            form: {
                name: { required, minLength: minLength(3) },
                email: { required, email },
                password: { required, minLength: minLength(6) },
                confirmPassword: { 
                    required, 
                    sameAsPassword: sameAs(this.form.password) 
                }
            }
        }
    },
    methods: {
        async registerUser() {
            const isValid = await this.v$.$validate();
            
            if (!isValid) {
                this.$toast.add({ 
                    severity: 'error', 
                    summary: 'Erro de validação', 
                    detail: 'Por favor, corrija os erros no formulário.', 
                    life: 3000 
                });
                return;
            }

            try {
                await this.authStore.register({
                    name: this.form.name,
                    email: this.form.email,
                    password: this.form.password
                });

                this.$toast.add({ 
                    severity: 'success', 
                    summary: 'Sucesso', 
                    detail: 'Conta criada com sucesso!', 
                    life: 3000 
                });

                setTimeout(() => {
                    this.$router.push('/');
                }, 1000);

            } catch (error: any) {
                this.$toast.add({ 
                    severity: 'error', 
                    summary: 'Erro', 
                    detail: error.message || 'Erro ao realizar cadastro.', 
                    life: 3000 
                });
            }
        }
    }
})
</script>