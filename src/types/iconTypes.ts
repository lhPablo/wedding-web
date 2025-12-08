export const IconTypes = {
    HOME: 'home',
    GIFT: 'gift',
    CONFIRM: 'confirm',
    LOCATION: 'location',
    TRANSPORT: 'transport',
    QUESTION: 'question',
    PHONE: 'phone'
} as const;

export type IconType = typeof IconTypes[keyof typeof IconTypes];

