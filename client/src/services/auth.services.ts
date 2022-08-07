import axios, { AxiosError } from "axios";
import type { LoginForm, SigninForm, User } from "@/shared/interfaces";
import { useUser } from "@/stores/user";


export async function register(formData: SigninForm): Promise<User> {
    try {
        const user = await axios.post("/api/auth/signup", formData);
        return user.data;
    } 
    catch (error) {
        throw error;
    }
}

export async function login(formData: LoginForm): Promise<User> {
    try {
        const { data } = await axios.post("/api/auth/login", { 
            email: formData.email, 
            password: formData.password 
        });

        return data;
    } 
    catch (error) {
        throw error;
    }
}

export async function refreshTokenRequest(): Promise<User> {
    try {
        const userStore = useUser();
        const res = await axios.post("/api/auth/refresh", userStore.currentUser?._id);
        return res.data;
    } 
    catch (error) {
        throw error;
    }
}

export async function fetchCurrentUser(): Promise<User> {
    try {
        const res = await axios.get("/api/user/me");
        return res.data;
    }
    catch (error) {
        console.log("catch");

        if (error instanceof AxiosError) {
            if(error.response?.data?.reason === "token expired") {
                console.log("reason");
                
                return await refreshTokenRequest();
            }            

            throw error;
        }

        throw error;
    }
}

export async function logout() {
    try {
        const res = await axios.delete("/api/auth/logout");
        return res.data;
    } 
    catch (error) {
        throw error;
    }
}