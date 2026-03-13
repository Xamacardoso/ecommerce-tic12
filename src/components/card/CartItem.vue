<template>
    <Card
        :style="{
            width: '100%',
            minWidth: '200px',
            // maxWidth: '420px',

        }"
    >
        <template #content>
            <div class="flex flex-col gap-2">
                <img :src="'https://picsum.photos/200'" class="w-20 object-cover h-full" alt="Foto do produto">
                
                <!-- titulo e preco -->
                <div class="flex-1 min-w-0">
                    <h3 class="text-lg font-bold">{{ cartItem.product.name }}</h3>
                    <p class="text-sm text-surface-500">Preço: R$ {{ cartItem.product.price.toFixed(2).replace('.', ',') }}</p>
                </div>

                <!-- inputnumber -->
                <div class="flex flex-col items-end gap-1">
                    <span class="text-[10px] font-bold text-surface-400 uppercase">
                        Quantidade
                    </span>
                    <InputNumber 
                        v-model="quantityModel"
                        show-buttons
                        button-layout="horizontal"
                        :min="0"
                        input-class="w-10 text-center font-bold"
                        class="h-8"
                    >
                        <template #incrementbuttonicon>
                            <span class="pi pi-plus">+</span>
                        </template>
                        <template #decrementbuttonicon>
                            <span class="pi pi-minus">-</span>
                        </template>
                    </InputNumber>
                </div>

                <!-- subtotal do item -->
                <div class="flex flex-row-reverse gap-8 items-center">
                    <p class="text-sm text-surface-500">Subtotal: R$ {{ (cartItem.product.price * cartItem.quantity).toFixed(2).replace('.', ',') }}</p>
                    <Button label="Remover do carrinho" @click="onRemoveItem(cartItem.product)" />
                </div>
            </div>
        </template>
    </Card>
</template>

<script lang="ts">
    import { defineComponent, type PropType } from 'vue';
    import type { CartItem } from '@/models/Cart';
    import type { Product } from '@/models/Product';

    export default defineComponent({
        name: 'CartItem',
        props: {
            cartItem: {
                type: Object as PropType<CartItem>,
                required: true
            }
        },
        // computed é uma propriedade que é calculada baseada em outras propriedades
        computed: {
            // quantityModel é uma propriedade que é calculada baseada na quantidade do item no carrinho
            quantityModel: {
                get() {
                    return this.cartItem.quantity;
                },
                set(value: number) {
                    // quando o usuario alterar a quantidade, ele emite um evento para atualizar a quantidade no pai
                    this.$emit('updateQuantity', {
                        product: this.cartItem.product,
                        quantity: value
                    });
                }
            }
        },
        emits: ['removeItem', 'updateQuantity'],
        methods: {
            onRemoveItem(product: Product) {
                this.$emit('removeItem', product);
            },
        }
    })
</script>