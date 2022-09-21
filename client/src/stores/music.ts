import { defineStore } from "pinia";
import { addMusic, fetchMusics } from "@/services/music.services";
import { formatTime } from "@/utils/features";
import type { MusicState } from "@/shared/interfaces/music.interface";


export const useMusic = defineStore("music", {
	state: (): MusicState => ({
		musics: [],
		currentMusic: {
			audio: null,
			metadata: null,
			isPaused: true,
			currentTime: 0,
			progress: 0,
			index: 0
		},
		fetch: {
			isLoading: false,
			loaded: false,
			needRefresh: false
		}
	}),
	getters: {
		currentTime({ currentMusic }) {
			return formatTime(currentMusic.currentTime);
		}
	},
	actions: {
		async addMusic (files: Set<File>) {
			try {				
				const musics = await addMusic(files);
				this.musics = musics;
				this.currentMusic.metadata = musics[0];
				this.fetch.needRefresh = true;
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
		shuffleMusic() {
			for (let i = this.musics.length - 1; i > 0; i--) {
				const nb = Math.floor(Math.random() * (i + 1));
				[this.musics[i], this.musics[nb]] = [this.musics[nb], this.musics[i]];
			}

			this.currentMusic.metadata = this.musics[0];
		},
		handlePlayPause() {
			if (this.currentMusic.audio?.paused) this.play();
			else this.pause();
		},
		play() {
			this.currentMusic.metadata = this.musics[this.currentMusic.index];
			this.currentMusic.isPaused = false;
			setTimeout(() => this.currentMusic.audio?.play());
		},
		pause() {
			this.currentMusic.isPaused = true;
			this.currentMusic.audio?.pause();
		},
		previous() {
			this.handleChangeSong("prev");
		},
		next() {
			this.handleChangeSong("next");
		},
		setDuration(e: Event) {
			const audio = e.target as HTMLAudioElement;
			if (this.currentMusic.metadata) {
				this.currentMusic.metadata.duration = audio.duration;
			}
		},
		setCurrentTime(e: Event) {
			const audio = e.target as HTMLAudioElement;
			this.currentMusic.currentTime = audio.currentTime;

			if (this.currentMusic.metadata) {
				this.currentMusic.progress = (audio.currentTime * this.currentMusic.metadata?.duration) / this.currentMusic.metadata?.duration;
			}
		},
		setProgress(to: number) {		
			if (this.currentMusic.audio) {
				this.currentMusic.audio.currentTime = to;
			}
		}
	}
});