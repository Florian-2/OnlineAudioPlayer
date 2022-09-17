<script lang="ts" setup>
const props = defineProps<{
    btnType: "primary" | "danger"
}>();
</script>

<template>
    <button :class="props.btnType == 'primary' ? 'primary-type' : 'danger-type'">
        <slot></slot>
    </button>
</template>

<style lang="scss" scoped>
button {
    padding: 1rem;
    font-size: clamp(1.25rem, 2vw, 1.5rem);
    background: transparent;
    border-radius: $raduis;
    letter-spacing: 0.5px;
    cursor: pointer;
    transition: all $transition-time;

    &:active {
        transform: scale(0.95);
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
}

.primary-type {
    color: $first-color;
    border: 2px solid $first-color;

    &:hover {
        background-color: $first-color;
        color: $second-color;
    }
}

.danger-type {
    color: $danger-color;
    border: 2px solid $danger-color;

    &:hover {
        background-color: $danger-color;
        color: $second-color;
    }
}
</style>