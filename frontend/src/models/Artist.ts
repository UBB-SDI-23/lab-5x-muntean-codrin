import Album from "./Album";

export default interface Artist {
    id?: number;
    name: string;
    description: string;
    websiteLink: string;
    debutYear: number;
    profilePictureUrl: string;
    albumList?: Album[];
}