export interface Music {
    _id: string
    album: string,
    albumartist: string,
    artist: string[],
    artists: string[],
    composer: string[],
    genre: string[],
    lyrics: string[],
    size: number,
    thumbnail: string,
    title: string,
    urlMusic: string,
    user_id: string
    __v: number
}

export interface MusicState {
    musics: Music[] | null
}