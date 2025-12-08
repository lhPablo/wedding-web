export const MenuIconTypes = {
    HOME: 'home',
    GIFT: 'gift',
    CONFIRM: 'confirm',
    LOCATION: 'location',
    TRANSPORT: 'transport',
    QUESTION: 'question',
    PHONE: 'phone'
} as const;

export type MenuIconType = typeof MenuIconTypes[keyof typeof MenuIconTypes];

