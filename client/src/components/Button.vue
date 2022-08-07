<script setup lang="ts">

</script>

<template>
    <button>
        <slot></slot>
    </button>
</template>

<style scoped>
button {
    background-color: var(--btn-color);
    border-radius: 10px;
    color: black;
    padding: 7px 10px;
    letter-spacing: 0.3px;
    cursor: pointer;
    font-weight: bold;
}
</style>