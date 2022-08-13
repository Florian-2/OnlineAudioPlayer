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

<style lang="scss" scoped>
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
        color: $primary-color;

        h1 {
            font-size: clamp(2.5rem, 3.5vw, 4rem);
            letter-spacing: 3px;
        }

        p {
            font-size: clamp(1.3rem, 2vw, 1.5rem);
            line-height: 1.4;
            letter-spacing: 0.5px;
        }

        a {
            display: inline-block;
            margin-right: 1.5rem;
            padding: 1rem 1.5rem;
            font-size: clamp(1.3rem, 2vw, 1.4rem);
            color: $primary-color;
            border: 2px solid $primary-color;
            border-radius: 3px;
            transition: all $time-anim;

            &:hover {
                box-shadow: inset 110px 0 0 0 $btn-color;
                border-color: $btn-color;
                color: black;
            }
        }
    }

    .background {
        background: url("headphone-background.jpg") no-repeat bottom/cover;
    }

    @media only screen and (max-width: 860px) {
        grid-template-columns: 1.5fr 1fr;
    }

    @media only screen and (max-width: 600px) {
        grid-template-columns: 1fr;

        .description {
            align-items: center;

            p {
                text-align: justify;
            }
        }

        .background {
            display: none;
        }
    }
}
</style>