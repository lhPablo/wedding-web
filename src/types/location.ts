export interface Location {
    id: string;
    title: string;
    image: ImageMetadata;
    description?: string;
    address: string;
    mapLink: string;
    time?: string;
    badge?: string;
}