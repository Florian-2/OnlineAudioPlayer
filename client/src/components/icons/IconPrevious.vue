<script lang="ts" setup>
defineProps<{
    color?: string;
}>()
</script>
        
<template>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path
        d="M400 111v290c0 17.44-17 28.52-31 20.16L121.09 272.79c-12.12-7.25-12.12-26.33 0-33.58L369 90.84c14-8.36 31 2.72 31 20.16z" />

    <path d="M112 80v352" />
</svg>
</template>
        
<style lang="scss" scoped>
svg {
    cursor: pointer;
    fill: none;
    stroke: $first-color;
    stroke-miterlimit: 10;
    stroke-width: 30px;
    stroke-linecap: round;
}
</style>