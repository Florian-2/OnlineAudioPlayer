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
} = useField<string>("username", undefined, { initialValue: "John", validateOnValueUpdate: false });
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
const { 
    value: confirmPwdValue, 
    errorMessage: confirmPwdError, 
    meta: confirmPwdMeta,
    handleChange: confirmPwdHandleChange, 
} = useField<string>("confirmPassword", undefined, { initialValue: "John2022", validateOnValueUpdate: false });

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
                <Button btnType="primary" type="submit" @click="onSubmit" :disabled="isSubmitting">S'inscrire</Button>
                <Button btnType="danger" type="reset" @click="() => form.resetForm()">Réinitialiser</Button>
            </div>
        </form>

        <p class="question-form">
            Vous avez un compte ? 
            <RouterLink to="/login">Connexion</RouterLink>
        </p>
    </div>
</template>