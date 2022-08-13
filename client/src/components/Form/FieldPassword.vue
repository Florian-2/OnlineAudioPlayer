<script setup lang="ts">
import { ref } from "vue";
import Button from "../Button.vue";
import IconEye from "../icons/IconEye.vue";
import IconEyeSlash from "../icons/IconEyeSlash.vue";


defineProps<{
    label: string;
    name: string;
    modelValue: string;
    error: any;
    handleChange: (payload: Event) => void,
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

        <div class="input">
            <input 
                :value="modelValue"
                @input="updateValue" 
                :type="showPassword ? 'text' : 'password'" :id="name" :name="name"
                @blur="handleChange"
                @change="handleChange"
                :class="{ 'error': meta.touched && !meta.valid && meta.validated }"  
            />

            <button type="button" @click="handleShowPassword">
                <IconEye v-if="!showPassword" color="white"/>
                <IconEyeSlash v-else color="white"/>
            </button>
        </div>

        <small v-if="error">{{ error }}</small>
    </div>
</template>

<style lang="scss" scoped>
.error {
    border: 2px solid red;
}

.input {
    position: relative;
}

button {
    background: transparent;
    border: none;
    cursor: pointer;
    position: absolute;
    right: 10px;
    transform: translate(0, -45%);
    top: 50%;
}
</style>