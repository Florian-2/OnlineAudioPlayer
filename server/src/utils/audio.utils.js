import fs from "fs/promises";
import path from 'path';
import { parseFile } from "music-metadata";
import { __dirname } from "../../fs.js";


export function getAudioFile(filename) {
    return path.join(__dirname, "src", "public", "upload", "music", filename);
}

export function getThumbnailAudioFile(filename) {
    return path.join(__dirname, "src", "public", "upload", "thumbnail", filename);
}

export function exctractFileName(originalname) {
    return originalname.substring(0, originalname.lastIndexOf('.'));
}

export async function createThumbnail(metadata, filename) {
    const mimeType = {
        "image/jpeg": "jpg",
        "image/png": "png"
    }

    if (metadata.picture) {
        const buffer = metadata.picture[0].data;
        const name = filename.split(".")[0];
        const format = metadata.picture[0].format;
        const path = getThumbnailAudioFile(`${name}.${mimeType[format]}`);
        console.log(path);
        await fs.writeFile(path, buffer);
        return path;
    }
    else {
        return getThumbnailAudioFile("default-cover.jpg");
    }
}

export async function createMusicList(files) {
    const musics = [];

    for (const file of files) {
        const filePath = getAudioFile(file.filename);

        const metadata = await parseFile(filePath);
        if (!metadata.common.title) {
            metadata.common.title = exctractFileName(file.originalname);
        }
        metadata.common.size = file.size;
        metadata.common.urlMusic = filePath;
        const pathPicture = await createThumbnail(metadata.common, file.filename);
        metadata.common.thumbnail = pathPicture;

        musics.push(metadata.common);
    }

    return musics;
}