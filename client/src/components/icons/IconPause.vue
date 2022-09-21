<script lang="ts" setup>
defineProps<{
    color?: string;
}>()
</script>
            
<template>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path d="M176 96h16v320h-16zM320 96h16v320h-16z" />
    </svg>
</template>
            
<style lang="scss" scoped>
svg {
    cursor: pointer;
    width: 35px;
    fill: none;
    stroke: $first-color;
    stroke-linejoin: round;
    stroke-width: 20px;
}
</style>