<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script lang="ts" setup>
import { useAttrs } from "vue";
import IconCross from "./icons/IconCross.vue";

const attrs = useAttrs();

function handleClick() {
    if (typeof attrs.onClick == "function") {
        attrs.onClick();
    }
}

defineProps<{
    message: string;
}>();
</script>

<template>
    <div class="container-error">
        <p>{{ message }}</p>
        <IconCross color="#000000" @click="handleClick"></IconCross>
    </div>
</template>

<style lang="scss" scoped>
.container-error {
    max-width: 500px;
    width: 100%;
    padding: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: darken($color: $danger-color, $amount: 5%);
    border-radius: 3px;

    p {
        color: black;
        font-size: 1.4rem;
        text-overflow: ellipsis;
        overflow: hidden;
    }
}
</style>