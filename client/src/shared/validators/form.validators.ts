import { z } from "zod";

export function sameAsPassword(data: { password: string, confirmPassword: string }) {
    return data.password === data.confirmPassword;
}

export const username = z.string({ required_error: "Nom d'utilisateur requis" }).trim().min(3, "3 caractères minimum");
export const email = z.string({ required_error: "Adresse email requise" }).trim().email("Format de l'adresse email incorrect");
export const passwordWithRules = z.string({ required_error: "Mot de passe requis" }).trim().min(8, "Le mot de passe doit contenir aux moins 8 caractères");
export const password = z.string({ required_error: "Mot de passe requis" }).trim().min(1, "Mot de passe requis");
export const confirmPassword = z.string({ required_error: "Confirmation du mot de passe requis" }).trim().min(1, "Mot de passe requis")

export const title = z.string({ required_error: "Titre requis" }).trim().min(2, "2 caractères minimum");
export const artists = z.string({ required_error: "Vous devez renseigner au moins un(e) artiste" }).trim().min(2, "2 caractères minimum");
export const album = z.string().optional();