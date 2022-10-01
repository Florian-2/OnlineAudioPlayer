import { defineStore } from "pinia";
import type { EditUser, LoginForm, SigninForm, UserState } from "@/shared/interfaces";
import { register, login, fetchCurrentUser, logout } from "@/services/auth.services";
import { editProfile } from "@/services/user.services";


export const useUser = defineStore("user", {
	state: (): UserState => ({
		currentUser: null,
		loaded: false
	}),
	getters: {
        isAuthenticated(state): boolean | null {
            if (state.currentUser) {
                return true;
            } 
			else if (!state.currentUser && state.loaded) {
                return false;
            } 
			else {
                return false;
            }
        }
	},
	actions: {		
		async register(formData: SigninForm) {
			try {
				const user = await register(formData);
				this.currentUser = user;
			} 
			catch (error) {
				throw error;
			}
		},
		async login({ email, password }: LoginForm) {
			try {
				const user = await login({ email, password });
				this.currentUser = user;		
			} 
			catch (error) {
				throw error;
			}
		},
		async logout() {
			try {
				await logout();
				this.currentUser = null;
			} 
			catch (error) {
				throw error;
			}
		},
		async fetchCurrentUser() {
			try {
				this.currentUser = await fetchCurrentUser();
				this.loaded = true;
			} 
			catch (error) {
				this.loaded = true;
			}
		},
		async editProfile(formData: EditUser) {
			try {
				const user = await editProfile(formData);
				this.currentUser = user;
			} 
			catch (error) {
				throw error;
			}
		}
	}
})