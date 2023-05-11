import Track from "./Track";

export default interface Playlist {
    id?: number;
    name: string;
    tracksCount: number;
    addedBy: string;
    trackList : Track[];
}