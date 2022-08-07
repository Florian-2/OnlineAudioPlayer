<script setup lang="ts">
import { ref } from "vue";


defineProps<{
    label: string;
    name: string;
    modelValue: string;
    error: any;
    handleChange: (payload: FocusEvent) => void,
    handleBlur: (payload: FocusEvent) => void,
    meta: { touched: boolean, valid: boolean, validated: boolean }
}>()

const emit = defineEmits<{
    (e: "update:modelValue", value: string): void
}>()

const showPassword = ref(false);

const updateValue = (e: Event) => { 
    const input = e.target as HTMLInputElement;
    emit("update:modelValue", input.value);
};

const handleShowPassword = (): boolean => showPassword.value = !showPassword.value;
</script>

<template>
    <div class="form-group">
        <label :for="name">{{ label }}</label>
        <input 
            :value="modelValue"
            @input="updateValue" 
            :type="showPassword ? 'text' : 'password'" :id="name" :name="name"
            @blur="handleChange"
            @focus="handleBlur"
            :class="{ 'error': meta.touched && !meta.valid && meta.validated }"  
        />

        <button type="button" @click="handleShowPassword">
            <img v-if="!showPassword" src="../icons/eye.svg" alt="eye">
            <img v-else src="../icons/eye-slash.svg" alt="eye-slash">
        </button>

        <small v-if="error">{{ error }}</small>
    </div>
</template>

<style scoped>
.error {
    border: 2px solid red;
}

img {
    width: 15px;
}
</style>