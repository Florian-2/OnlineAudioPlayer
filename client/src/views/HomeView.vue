<script setup lang="ts">

</script>

<template>
    <section class="container">
        <div class="description item">
            <h1>Audio Player</h1>

            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis debitis itaque, veritatis alias harum a totam, ipsam eveniet aliquid cum quaerat exercitationem? Saepe, eligendi facilis? Doloremque debitis mollitia placeat aperiam.</p>

            <div class="links">
                <router-link to="register">Inscription</router-link>
                <router-link to="login">Connexion</router-link>
            </div>
        </div>

        <div class="background item"></div>
    </section>
</template>

<style scoped lang="scss">
section.container {
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    background: $bg-color;

    .description {
        max-width: 400px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        margin: 0 auto;
        padding: 1rem;
        gap: 2.5rem;
        color: $text-color;

        h1 {
            font-size: 4rem;
            letter-spacing: 3px;
        }

        p {
            font-size: 1.4rem;
            line-height: 1.4;
            letter-spacing: 0.5px;
        }

        a {
            display: inline-block;
            margin-right: 1.5rem;
            padding: 1rem 1.5rem;
            font-size: 1.4rem;
            color: $text-color;
            border: 2px solid #8e9eab;
            border-radius: 3px;
            transition: box-shadow $time-anim, color $time-anim;

            &:hover {
                box-shadow: inset 110px 0 0 0 #8e9eab;
            }
        }
    }

    .background {
        background: url("headphone-background.jpg") no-repeat bottom/cover;
    }
}
</style>