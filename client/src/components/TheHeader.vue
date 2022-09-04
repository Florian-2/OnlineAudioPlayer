<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import IconAngleRight from "./icons/IconAngleRight.vue";
import Button from "./Button.vue";

const dropdownIsOpen = ref<boolean>(false);
const toggleDropdown = () => dropdownIsOpen.value = !dropdownIsOpen.value;

defineProps<{
    isAuthenticated: boolean | null;
}>();

const emit = defineEmits<{
    (e: 'logout'): void
}>();
</script>

<template>
    <header>
        <h1>O-Music</h1>

        <nav>
            <router-link to="/audio-player">Accueil</router-link>
            <router-link to="/profil">Profil</router-link>
            <router-link to="/favorite">Favoris</router-link>

            <div class="dropdown">
                <button @click="toggleDropdown">
                    Mes musiques
                    <IconAngleRight :class="{ 'rotate': dropdownIsOpen }" color="#fff"/>
                </button>

                <div v-if="dropdownIsOpen" class="menu">
                    <router-link to="/music-management/add-music">Ajouter des musiques</router-link>
                    <router-link to="/music-management/handle-music">Gérer des musiques</router-link>
                </div>
            </div>    
        </nav>

        <Button btnType="danger" @click="emit('logout')">Déconnexion</Button>
    </header>
</template>

<style scoped lang="scss">
header {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

nav {
    margin-top: -20rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    
    a {
        display: inline-block;
        font-size: 1.4rem;
        padding-block: 0.5rem;
        color: $first-color;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        border-radius: 3px;
        transition: all $transition-time;

        &:hover {
            color: $second-color;
            background-color: $first-color;
        }
    }

    .dropdown {
        button {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 1.4rem;
            background: transparent;
            color: $first-color;
            border: none;
            cursor: pointer;
        }  

        .rotate {
            transform: rotate(90deg);
        }
        
        .menu {
            margin-left: 1rem;
            margin-top: 0.5rem;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
    }
}

.router-link-active {
    color: $second-color;
    background-color: $first-color;
}
</style>