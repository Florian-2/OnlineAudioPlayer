import axios from "axios";
import type { EditMusic, Music } from "@/shared/interfaces/music.interface";
import { useMusic } from "@/stores/music";


export async function addMusic(files: Set<File>): Promise<Music[]> {
    try {
        const formData = new FormData();

        files.forEach((file) => formData.append("musics", file));

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
    const musicStore = useMusic();
    
    try {
        if (!musicStore.fetch.loaded || musicStore.fetch.needRefresh) {
            musicStore.fetchMusics();
            musicStore.fetch.loaded = true;
        }
    } 
    catch (error) {
        throw error;
    }
    finally {
        musicStore.fetch.needRefresh = false;
    }
}

export async function fetchOneMusic(musicId: string): Promise<Music> {
    try {
        const musics = await axios.get(`/api/music/${musicId}`);
        return musics.data;
    } 
    catch (error) {
        throw error;
    }
}

export async function editMusic(musicId: string, formData: EditMusic): Promise<Music> {
    try {
        const musics = await axios.put(`/api/music/edit/${musicId}`, formData);
        return musics.data.musics[0];
    } 
    catch (error) {
        throw error;
    }
}

export async function favorites(musicId: string, value: boolean): Promise<boolean> {
    try {
        const res = await axios.put(`/api/music/add-to-favorite/${musicId}`, { fav: value });
        return res.data.result;
    } 
    catch (error) {
        console.log(error);
        throw error;
    }
}

export async function deleteMusic(musicId: string) {
    try {
        const res = await axios.delete(`/api/music/delete/${musicId}`);
        console.log(res.data);
        
        return res.data.result;
    } 
    catch (error) {
        console.log(error);
        throw error;
    }
}