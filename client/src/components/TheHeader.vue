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
        <div class="nav-container">
            <h1>O-Music</h1>

            <nav>
                <router-link to="/audio-player">Lecteur</router-link>
                <router-link to="/profil">Profil</router-link>

                <div class="dropdown">
                    <button @click="toggleDropdown">
                        Mes musiques
                        <IconAngleRight :class="{ 'rotate': dropdownIsOpen }" color="#cccccc"/>
                    </button>

                    <div v-if="dropdownIsOpen" class="menu">
                        <router-link to="/music-management/add-music">Ajouter des musiques</router-link>
                        <router-link to="/music-management/handle-music" :class="{ 'router-link-active': $route.name === 'Edit' }">Gérer des musiques</router-link>
                    </div>
                </div>    
            </nav>
        </div>

        <Button btnType="danger" @click="emit('logout')" class="logout">Déconnexion</Button>
    </header>
</template>

<style scoped lang="scss">
header {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .nav-container h1 {
        margin-bottom: 3rem;
        color: $first-color;
    }
}

nav {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    
    a {
        display: inline-block;
        font-size: 1.4rem;
        padding-block: 0.5rem;
        color: $first-color-light;
        @include Ellipsis(nowrap);
        border-radius: $raduis;
        transition: all $transition-time;
        position: relative;

        &:hover {
            color: $first-color;
        }
    }

    .dropdown {
        button {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 1.4rem;
            background: transparent;
            color: $first-color-light;
            border: none;
            cursor: pointer;
            transition: all $transition-time;

            &:hover {
                color: $first-color;
            }
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

.router-link-active, 
.router-link-exact-active {
    color: $first-color;
    transform: translateX(10px);
    font-weight: 500;
}
</style>