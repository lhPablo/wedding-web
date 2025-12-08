import type { FieldType } from 'src/types/fieldTypes';

export interface FieldConfig {
    name: string;
    label: string;
    type: FieldType;
    required?: boolean;
    placeholder?: string;
    options?: string[];
}