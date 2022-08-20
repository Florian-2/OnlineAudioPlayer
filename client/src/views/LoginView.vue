<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { z } from "zod";
import { useField, useForm } from "vee-validate";
import { toFormValidator } from "@vee-validate/zod";
import { useUser } from "@/stores/user";
import { email, password } from "@/shared/validators/form.validators";
import type { SigninForm } from "@/shared/interfaces";
import Field from "../components/Form/Field.vue";
import FieldPassword from "../components/Form/FieldPassword.vue";
import Button from "../components/Button.vue";

const userStore = useUser();
const router = useRouter();
const errorLogin = ref("");

const validationSchema = toFormValidator(z.object({
    email,
    password
}));

const form = useForm<SigninForm>({ validationSchema });

const { 
    value: emailValue, 
    errorMessage: emailError, 
    meta: emailMeta,
    handleChange: emailHandleChange, 
} = useField<string>("email", undefined, { initialValue: "john@mail.com", validateOnValueUpdate: false });
const { 
    value: passwordValue, 
    errorMessage: passwordError, 
    meta: passwordMeta,
    handleChange: passwordHandleChange, 
} = useField<string>("password", undefined, { initialValue: "John2022", validateOnValueUpdate: false });


const onSubmit = form.handleSubmit(async (formData) => {
    try {
        await userStore.login(formData);
        router.push("/profil");
    } 
    catch (error) {
        errorLogin.value = "Adresse mail ou mot de passe incorrect.";
        console.log(error);
    }
})

const isSubmitting = form.isSubmitting;
</script>

<template>
    <div class="form-container">
        <h1>Connexion</h1>

        <form @submit.prevent="onSubmit">
            <Field 
                v-model="emailValue" 
                type="email" name="email" label="Adresse email" 
                icon="email"
                :error="emailError"
                :meta="emailMeta"
                :handleChange="emailHandleChange"
            />

            <FieldPassword
                v-model="passwordValue" 
                name="password" label="Mot de passe" 
                :error="passwordError"
                :meta="passwordMeta"
                :handleChange="passwordHandleChange"
            />

            <p v-if="errorLogin">{{ errorLogin }}</p>

            <div class="btn-action">
                <Button type="submit" @click="onSubmit" :disabled="isSubmitting">Connexion</Button>
                <Button type="reset" @click="() => form.resetForm()">Réinitialiser</Button>
            </div>
        </form>
    </div>
</template>

<style lang="scss" scoped>
form {
    max-width: 400px;
    width: 100%;
    margin: 0 auto;
    padding: 1rem;
}

.btn-action {
    @include Flex(flex-start);
    gap: 2rem;
    padding-top: 2rem;

    @media only screen and (max-width: 500px) {
        justify-content: center;
    }
}

.form-container {
    height: 100%;
    @include Flex(center);
    flex-direction: column;
    gap: 2.5rem;

    h1 {
        align-self: center;
        font-size: clamp(2.2rem, 3vw, 3rem);
        color: $first-color;
    }
}
</style>