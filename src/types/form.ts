import type { FieldConfig } from "./field";

export interface FormConfig {
    title: string;
    description?: string;
    fields: FieldConfig[];
    submitText: string;
    successMessage: string;
    errorMessage: string;
    googleScriptUrl: string;
}
  
  