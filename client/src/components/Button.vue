<template>
    <button>
        <slot></slot>
    </button>
</template>

<style lang="scss" scoped>
button {
    background: transparent;
    padding: 1rem;
    font-size: clamp(1.25rem, 2vw, 1.4rem);
    color: $primary-color;
    letter-spacing: 0.3px;
    border-radius: 3px;
    border: 2px solid $primary-color;
    cursor: pointer;
    transition: all $time-anim;

    &:hover, &:focus {
        box-shadow: inset 100px 0 0 0 $btn-color;
        border-color: $btn-color;
        color: black;
    }
}

button[type=reset]:hover, button[type=reset]:focus {
    box-shadow: inset 100px 0 0 0 $danger-color;
    border-color: $danger-color;
}
</style>