import { defineStore } from "pinia";
import { addMusic, deleteMusic, favorites, fetchMusics } from "@/services/music.services";
import { formatTime, generateRandomNumberArr } from "@/utils/features";
import type { MusicState } from "@/shared/interfaces/music.interface";


export const useMusic = defineStore("music", {
	state: (): MusicState => ({
		musics: [],
		copyMusics: [],
		favOnly: false,
		shufflePlay: false,
		randomOrderPlayingMusic: [],
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
				this.copyMusics = musics;
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
				this.copyMusics = musics;
				this.currentMusic.metadata = musics[0];
			} 
			catch (error) {
				throw error;
			}
			finally {
				this.fetch.isLoading = false;
			}
		},
		async favorite(musicId: string) {
			const indexMusic = this.musics.findIndex((music) => music._id === musicId);
			const music = this.musics[indexMusic];

			try {
				if (indexMusic !== -1) {
					if (!music.fav) { // like 
						music.fav = true
						return await favorites(musicId, true);
					} 
					// dislike
					music.fav = false;
					this.musics = this.musics.filter((music) => music.fav === true);

					return await favorites(musicId, false);
				}
			} 
			catch (error) {
				throw error;
			}
		},
		async deleteMusic(musicId: string) {
			try {
				const indexMusic = this.musics.findIndex((music) => music._id === musicId);
				this.musics.splice(indexMusic, 1);
				await deleteMusic(musicId);
			} 
			catch (error) {
				throw error;
			}
		},
		handleChangeSong(action: string) {

			// Gérer la lecture aléatoire
			if (this.shufflePlay === true) {
				const currentIndex = this.randomOrderPlayingMusic.indexOf(this.currentMusic.index);

				const nextIndex = this.randomOrderPlayingMusic[currentIndex + 1];

				if (typeof nextIndex === "undefined") {					
					this.currentMusic.index = 0;
					this.shufflePlay = false;
					console.warn("Liste terminée, retour à la première musique de la liste");
				}
				else {
					this.currentMusic.index = nextIndex;
				}

				return this.play();
			}

			// Lecture simple
			action === "next" ? this.currentMusic.index++ : this.currentMusic.index--;

			if (this.currentMusic.index < 0) {
				this.currentMusic.index = this.musics.length - 1;
			} 
			else if (this.currentMusic.index > this.musics.length - 1) { 
				this.currentMusic.index = 0;
			}

			this.play();
		},
		selectMusic(id: string) {	
			const indexMusic = this.musics.findIndex((music) => music._id === id) || 0;
			this.currentMusic.index = indexMusic;

			if (this.shufflePlay) {
				this.shufflePlay = false; // Interruption de la lecture aléatoire
				console.warn("Lecture aléatoire interrompue");
			}
			this.play();
		},
		playAShuffledSong() {
			this.randomOrderPlayingMusic = generateRandomNumberArr(this.musics.length);
			this.shufflePlay = true;
			this.currentMusic.index = this.randomOrderPlayingMusic[0];
			this.play();
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