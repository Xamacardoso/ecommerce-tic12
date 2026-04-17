<template>
    <main class="flex flex-col items-center justify-center min-h-screen bg-neutral-50 px-4">
        <Toast />
        <Card class="w-full max-w-md shadow-lg">
            <template #title>
                <div class="text-2xl font-bold text-center text-neutral-800">Faça seu login</div>
            </template>
            <template #content>
                <form class="flex flex-col gap-4" @submit.prevent="loginUser">
                    <div class="flex flex-col gap-2">
                        <label for="email" class="font-medium">Email</label>
                        <InputText id="email" v-model="form.email" :class="{'p-invalid': v$.form.email.$error}" placeholder="exemplo@email.com" />
                        <Error :value="v$.form" field="email" />
                    </div>
                    
                    <div class="flex flex-col gap-2">
                        <label for="password" class="font-medium">Senha</label>
                        <Password id="password" v-model="form.password" :class="{'p-invalid': v$.form.password.$error}" :feedback="false" :toggleMask="true" placeholder="Sua senha" />
                        <Error :value="v$.form" field="password" />
                    </div>

                    <Button type="submit" :loading="authStore.loading" class="w-full mt-2" label="Entrar" icon="pi pi-sign-in" />
                    
                    <div class="text-center mt-4 text-sm text-neutral-600">
                        Não tem uma conta? 
                        <router-link to="/register" class="text-primary font-bold hover:underline">Cadastre-se</router-link>
                    </div>
                </form>
            </template>
        </Card>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import Error from '@/components/Error.vue';
import LoginForm from '@/models/login.model';
import { useAuthStore } from '@/stores/auth';

export default defineComponent({
    name: "Login",
    components: { Error },
    setup() {
        return {
            v$: useVuelidate(),
            authStore: useAuthStore()
        }
    },
    data() {
        return {
            form: new LoginForm()
        }
    },
    validations() {
        return {
            form: {
                email: { required, email },
                password: { required }
            }
        }
    },
    methods: {
        async loginUser() {
            const isValid = await this.v$.$validate();
            
            if (!isValid) {
                this.$toast.add({ 
                    severity: 'error', 
                    summary: 'Erro de validação', 
                    detail: 'Por favor, preencha os campos corretamente.', 
                    life: 3000 
                });
                return;
            }

            try {
                await this.authStore.login({
                    email: this.form.email,
                    password: this.form.password
                });
                
                this.$toast.add({ 
                    severity: 'success', 
                    summary: 'Sucesso', 
                    detail: 'Login realizado com sucesso!', 
                    life: 3000 
                });

                // Redireciona após um pequeno delay para o Toast ser visível
                setTimeout(() => {
                    const redirectPath = this.$route.query.redirect as string || '/';
                    this.$router.push(redirectPath);
                }, 500);

            } catch (error: any) {
                this.$toast.add({ 
                    severity: 'error', 
                    summary: 'Erro', 
                    detail: error.message || 'Credenciais inválidas', 
                    life: 3000 
                });
            }
        }
    }
})
</script>