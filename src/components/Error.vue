<template>
    <span v-if="value?.$errors.length > 0">
        <p v-for="error in value?.[`${field}`].$errors" class="text-red-500 text-sm mt-1">
            {{ error.$message }}
        </p>
    </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: "Error",
    props: {
        value: {
            type: Object,
        },
        field: {
            type: String,
            required: true
        }
    }
})
</script>