export const FieldTypes = {
    TEXT: 'text',
    EMAIL: 'email',
    TEL: 'tel',
    SELECT: 'select',
    TEXTAREA: 'textarea',
    NUMBER: 'number',
    CHECKBOX: 'checkbox'
} as const;

export type FieldType = typeof FieldTypes[keyof typeof FieldTypes];

