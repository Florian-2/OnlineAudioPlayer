<script lang="ts" setup>
import { ref, watch, watchEffect } from 'vue';

const backgroundSize = ref(0);

const props = defineProps<{
    inputMin: number | string;
    inputMax: number | string;
    inputStep: number | string;
    modelValue: number;
}>();

watchEffect(() => {
    const min = Number(props.inputMin);
    const max = Number(props.inputMax);
    backgroundSize.value = (props.modelValue - min) * 100 / (max - min);
});
</script>

<template>
    <input 
        type="range" 
        :min="inputMin" 
        :max="inputMax" 
        :step="inputStep" 
        :value="modelValue" 
        :style="{ 'background-size': backgroundSize + '% 100%' }" 
    />
</template>

<style lang="scss" scoped>
input[type=range] {
    height: 5px;
    cursor: pointer;
    -webkit-appearance: none;
    appearance: none;
    background-color: $second-color;
    border-radius: 8px;
    background-image: linear-gradient($first-color, $first-color);
    background-size: 20% 100%;
    background-repeat: no-repeat;

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        height: 12px;
        width: 16px;
        border-radius: 10px;
        background: $first-color;
    }

    &::-webkit-slider-runnable-track {
        -webkit-appearance: none;
        appearance: none;
        box-shadow: none;
        border: none;
        background: none;
    }
}

// input[type=range]::-webkit-slider-thumb {
//     -webkit-appearance: none;
//     appearance: none;
//     height: 12px;
//     width: 16px;
//     border-radius: 10px;
//     background: $first-color;
// }

// input[type=range]::-webkit-slider-runnable-track {
//     -webkit-appearance: none;
//     appearance: none;
//     box-shadow: none;
//     border: none;
//     background: none;
// }
</style>