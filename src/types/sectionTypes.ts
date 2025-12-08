export const SectionTypes = {
    HERO: 'hero',
    LOCATION: 'location',
    EXPANDABLE: 'expandable',
    CONTACT: 'contact',
    FORM: 'form',
    GIFT: 'gift'
} as const;

export type SectionType = typeof SectionTypes[keyof typeof SectionTypes];