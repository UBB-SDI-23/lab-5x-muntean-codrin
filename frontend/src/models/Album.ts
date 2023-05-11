import Artist from "./Artist";

export default interface Album {
    id?: number;
    title: string;
    artistId: number;
    releaseDate: Date;
    coverImageUrl: string;
    tracksCount: number;
    addedBy: string;
    artist : Artist;
}