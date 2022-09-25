export interface Music {
    _id: string;
    fav: boolean;
    title: string;
    album?: string;
    albumartist?: string;
    artist?: string[];
    artists?: string[];
    composer?: string[];
    genre?: string[];
    lyrics?: string[];
    duration: number;
    formatDuration: string,
    size: number;
    thumbnail: string;
    urlMusic: string;
    // user_id: string;
    // __v: number;
}

export interface MusicState {
    musics: Music[];
    copyMusics: Music[]; // Readonly
    shufflePlay: boolean;
    randomOrderPlayingMusic: number[];
    currentMusic: { 
        audio: HTMLAudioElement | null;
        metadata: Music | null;
        isPaused: boolean;
        currentTime: number,
        progress: number;
        index: number;
    };
    fetch: {
        isLoading: boolean;
        loaded: boolean;
        needRefresh: boolean;
    };
}