import { defineStore } from "pinia";
import { addMusic } from "@/services/music.services";
import type { MusicState } from "@/shared/interfaces/music.interface";


export const useMusic = defineStore("music", {
	state: (): MusicState => ({
		musics: null
	}),
	actions: {
		async addMusic (files: FileList) {
			try {				
				const musics = await addMusic(files);
				this.musics = musics;
			} 
			catch (error) {				
				console.log(error);
			}
		}
	}
})