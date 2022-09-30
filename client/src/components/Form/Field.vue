<script setup lang="ts">
defineProps<{
    type: "text" | "email";
    label: string | undefined;
    name: string;
    modelValue: string;
    error: any;
    handleChange: (payload: Event) => void,
    meta: { touched: boolean, valid: boolean, validated: boolean }
}>()

const emit = defineEmits<{
    (e: "update:modelValue", value: string): void
}>()

const updateValue = (e: Event) => { 
    const input = e.target as HTMLInputElement;
    emit("update:modelValue", input.value);
};
</script>

<template>
    <div class="form-group">
        <label :for="name">{{ label }}</label>

        <input 
            :value="modelValue"
            @input="updateValue" 
            :type="type" :id="name" :name="name"
            @blur="handleChange"
            @change="handleChange"
            :class="{ 'error': meta.touched && !meta.valid && meta.validated }"  
        />

        <small v-if="error">{{ error }}</small>
    </div>
</template>