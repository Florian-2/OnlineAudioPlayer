import { useUser } from "@/stores/user";

export function isAuthenticated() {
    const userStore = useUser();
    if (!userStore.currentUser) {
        return "/login";
    }
}

export function isNotAuthenticated() {
    const userStore = useUser();
    if (userStore.currentUser) {
        return "/profil";
    }
}