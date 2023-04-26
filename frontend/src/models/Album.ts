export default interface Album {
    id?: number;
    title: string;
    artistId: number;
    releaseDate: Date;
    coverImageUrl: string;
}