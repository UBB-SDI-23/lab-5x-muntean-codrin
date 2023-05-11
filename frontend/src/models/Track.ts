import Album from "./Album";

export default interface Track {
    id?: number;
    name: string;
    albumId: string;
    composer: string;
    milliseconds: number;
    releaseDate: Date;
    appearsInPlaylists: number;
    addedBy: string;
    album : Album;
}