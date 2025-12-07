export interface FormField {
    name: string;
    label: string;
    type: 'text' | 'email' | 'tel' | 'select' | 'textarea' | 'number';
    required?: boolean;
    placeholder?: string;
    options?: string[];
}
  
export interface FormConfig {
    title: string;
    description?: string;
    fields: FormField[];
    submitText: string;
    successMessage: string;
    errorMessage: string;
    googleScriptUrl: string;
}
  
  