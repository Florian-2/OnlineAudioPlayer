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
    size: number;
    thumbnail: string;
    urlMusic: string;
    user_id: string;
    __v: number;
}

export interface MusicState {
    musics: Music[];
    loaded: boolean;
    needRefresh: boolean;
}