<template>
    <section class="container">
        <div class="description">
            <h1>O-Music</h1>

            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis debitis itaque, veritatis alias harum a totam, ipsam eveniet aliquid cum quaerat exercitationem? Saepe, eligendi facilis? Doloremque debitis mollitia placeat aperiam.</p>

            <div class="links">
                <router-link to="register">Inscription</router-link>
                <router-link to="login">Connexion</router-link>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
section.container {
    height: 100%;
    @include Flex(center);
    position: relative;
    background-color: $second-color;
    
    .description {
        max-width: 800px;
        padding: 1rem;
        @include Flex(center);
        flex-direction: column;
        gap: 3rem;
        color: $first-color;
        z-index: 2;
    }

    h1{
        font-size: clamp(2.7rem, 3.5vw, 4.5rem);
        letter-spacing: 1px;
    }
    p {
        font-size: clamp(1.3rem, 2vw, 1.6rem);
        letter-spacing: 0.1px;
        text-align: center;
    }
    a {

        display: inline-block;
        margin-left: 2rem; 
        padding: 1rem;
        color: $first-color;
        font-size: clamp(1.2rem, 2vw, 1.4rem);
        letter-spacing: 0.2px;
        border: 2px solid $first-color;
        border-radius: 5px;
        transition: all $transition-time;

        &:hover {
            background-color: $first-color;
            color: black;
        }
    }

    &::before {
        content: "";
        position: absolute;
        top: 30%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 75%;
        height: 400px;
        background-image: linear-gradient(286deg,rgb(27 231 255/50%) 25.99%,#e47aff 64.62%,rgb(109 19 255/60%) 80.2%);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        border-radius: 100%;
        filter: blur(100px);
        opacity: 0.7;
    }
}
</style>