import { defineStore } from "pinia";
import { addMusic, fetchMusics } from "@/services/music.services";
import type { MusicState } from "@/shared/interfaces/music.interface";


export const useMusic = defineStore("music", {
	state: (): MusicState => ({
		musics: [],
		currentMusic: {
			audio: null,
			metadata: null,
			index: 0,
		},
		fetch: {
			isLoading: false,
			loaded: false,
			needRefresh: false,
		}
	}),
	actions: {
		async addMusic (files: Set<File>) {
			try {				
				const musics = await addMusic(files);
				this.musics = musics;
				this.currentMusic.metadata = musics[0];
			} 
			catch (error) {	
				throw error;
			}
		},
		async fetchMusics() {
			try {
				this.fetch.isLoading = true;
				const musics = await fetchMusics();
				this.musics = musics;
				this.currentMusic.metadata = musics[0];
			} 
			catch (error) {
				throw error;
			}
			finally {
				this.fetch.isLoading = false;
			}
		},
		handleChangeSong(action: string) {
			action === "next" ? this.currentMusic.index++ : this.currentMusic.index--;

			if (this.currentMusic.index < 0) {
				this.currentMusic.index = this.musics.length - 1;
			} 
			else if (this.currentMusic.index > this.musics.length - 1) { 
				this.currentMusic.index = 0;
			}

			this.play();
		},
		selectMusic(indexSong: number) {	
			if (indexSong !== this.currentMusic.index) {
				this.currentMusic.index = indexSong;
				this.play();
			}
		},
		handlePlayPause() {
			if (this.currentMusic.audio?.paused) this.play();
			else this.pause();
		},
		play() {
			this.currentMusic.metadata = this.musics[this.currentMusic.index];
			setTimeout(() => this.currentMusic.audio?.play());
		},
		pause() {
			this.currentMusic.audio?.pause();
		},
		previous() {
			this.handleChangeSong("prev");
		},
		next() {
			this.handleChangeSong("next");
		}
	}
});