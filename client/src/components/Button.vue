<template>
    <button>
        <slot></slot>
    </button>
</template>

<style lang="scss" scoped>
button {
    background: transparent;
    padding: 1rem;
    font-size: clamp(1.25rem, 2vw, 1.5rem);
    color: $first-color;
    letter-spacing: 0.5px;
    border-radius: 3px;
    border: 2px solid $first-color;
    cursor: pointer;
    transition: all $transition-time;

    &:hover {
        background-color: $first-color;
        border-color: $btn-color;
        color: $second-color;
    }

    &[type=reset] {
        border-color: $danger-color;
        color: $danger-color;
    }

    &:active {
        transform: scale(0.95);
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
}

button[type=reset]:hover, button[type=reset]:focus {
    background-color: $danger-color;
    color: $second-color;
}
</style>