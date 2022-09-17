export interface Music {
    _id: string;
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
    user_id: string;
    __v: number;
}

export interface MusicState {
    musics: Music[];
    currentMusic: { 
        audio: HTMLAudioElement | null;
        metadata: Music | null;
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