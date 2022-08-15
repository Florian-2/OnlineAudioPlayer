import axios from "axios";
import type { Music } from "@/shared/interfaces/music.interface";


export async function addMusic(files: FileList): Promise<Music[]> {
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