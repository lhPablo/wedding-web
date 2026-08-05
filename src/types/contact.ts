export interface Contact {
    id: string;
    name: string;
    email: string;
    phone?: string;
    avatar?: ImageMetadata;
    avatarAlt?: ImageMetadata;
    avatarMobile?: ImageMetadata;
    avatarAltMobile?: ImageMetadata;
    role?: string;
}