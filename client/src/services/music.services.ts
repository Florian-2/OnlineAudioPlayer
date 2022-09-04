import axios from "axios";
import type { Music } from "@/shared/interfaces/music.interface";
import { useMusic } from "@/stores/music";


export async function addMusic(files: File[]): Promise<Music[]> {
    try {
        const formData = new FormData();
        
        for (const file of files) {
            formData.append("musics", file);
        }

        const musics = await axios.post("/api/music/add", formData);
        return musics.data;
    } 
    catch (error) {
        throw error;
    }
}

export async function fetchMusics(): Promise<Music[]> {
    try {
        const musics = await axios.get("/api/music/getAll");        
        return musics.data.musics;
    } 
    catch (error) {
        throw error;
    }
}

export async function initialFetchMusics(): Promise<void> {
    try {
        const musicStore = useMusic();

        if (!musicStore.loaded) {
            musicStore.fetchMusics();
            musicStore.loaded = true;
        }
    } 
    catch (error) {
        throw error;
    }
}