<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { z } from "zod";
import { useField, useForm } from "vee-validate";
import { toFormValidator } from "@vee-validate/zod";
import { useUser } from "@/stores/user";
import { username, email, passwordWithRules, confirmPassword, sameAsPassword } from "@/shared/validators/form.validators";
import type { SigninForm } from "@/shared/interfaces";
import { AxiosError } from "axios";
import Field from "../components/Form/Field.vue";
import FieldPassword from "../components/Form/FieldPassword.vue";
import Button from "../components/Button.vue";


const errorRegister = ref("");
const userStore = useUser();
const router = useRouter();

const validationSchema = toFormValidator(z.object({
    username,
    email,
    password: passwordWithRules,
    confirmPassword
})
.refine((data) => sameAsPassword(data), { 
    path: ["confirmPassword"], 
    message: "Les mot de passe ne correspondent pas" 
}));

const form = useForm<SigninForm>({ validationSchema });

const { 
    value: usernameValue, 
    errorMessage: usernameError, 
    meta: usernameMeta, 
    handleChange: usernameHandleChange, 
} = useField<string>("username", undefined, { initialValue: "", validateOnValueUpdate: false });
const { 
    value: emailValue, 
    errorMessage: emailError, 
    meta: emailMeta,
    handleChange: emailHandleChange, 
} = useField<string>("email", undefined, { initialValue: "", validateOnValueUpdate: false });
const { 
    value: passwordValue, 
    errorMessage: passwordError, 
    meta: passwordMeta,
    handleChange: passwordHandleChange, 
} = useField<string>("password", undefined, { initialValue: "", validateOnValueUpdate: false });
const { 
    value: confirmPwdValue, 
    errorMessage: confirmPwdError, 
    meta: confirmPwdMeta,
    handleChange: confirmPwdHandleChange, 
} = useField<string>("confirmPassword", undefined, { initialValue: "", validateOnValueUpdate: false });

const onSubmit = form.handleSubmit(async (formData) => {    
    try {      
        await userStore.register(formData);
        router.push("/login");
    } 
    catch (error) {
        if (error instanceof AxiosError) {
            console.log(error);
            
            const errors = error.response?.data;            
            form.setErrors({...errors.errors});
        }
    }
})

const isSubmitting = form.isSubmitting;
</script>

<template>
    <div class="form-container">   
        <h1>Inscription</h1>

        <form @submit.prevent="onSubmit">
            <Field 
                v-model="usernameValue" 
                type="text" name="username" label="Nom d'utilisateur" 
                icon="user"
                :error="usernameError"
                :meta="usernameMeta"
                :handleChange="usernameHandleChange"
            />

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

            <FieldPassword
                v-model="(confirmPwdValue as string)" 
                name="confirmPwd" label="Confirmer le mot de passe" 
                :error="confirmPwdError"
                :meta="confirmPwdMeta"
                :handleChange="confirmPwdHandleChange"
            />

            <p v-if="errorRegister">{{ errorRegister }}</p>

            <div class="btn-action">
                <Button type="submit" @click="onSubmit" :disabled="isSubmitting">S'inscrire</Button>
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