import { defineStore } from "pinia";
import { addMusic, fetchMusics } from "@/services/music.services";
import type { MusicState } from "@/shared/interfaces/music.interface";


export const useMusic = defineStore("music", {
	state: (): MusicState => ({
		musics: [],
		loaded: false,
		needRefresh: false,
	}),
	actions: {
		async addMusic (files: File[]) {
			try {				
				const musics = await addMusic(files);
				this.musics = musics;
			} 
			catch (error) {	
				throw error;
			}
		},
		async fetchMusics() {
			try {
				const musics = await fetchMusics();
				this.musics = musics;
			} 
			catch (error) {
				throw error;
			}
		}
	}
});