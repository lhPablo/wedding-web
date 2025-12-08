import type { FormConfig } from '../types/form';
import { FieldTypes } from 'src/types/fieldTypes';

export const assistanceForm: FormConfig = {
  title: 'Confirma tu asistencia',
  description: 'Por favor, completa el formulario para confirmar tu asistencia a la boda.',
  fields: [
    {
      name: 'nombre',
      label: 'Nombre completo',
      type: FieldTypes.TEXT,
      required: true,
      placeholder: 'Ej: Juan Pérez'
    },
    {
      name: 'email',
      label: 'Email',
      type: FieldTypes.EMAIL,
      required: true,
      placeholder: 'tu@email.com'
    },
    {
      name: 'telefono',
      label: 'Teléfono',
      type: FieldTypes.TEL,
      required: false,
      placeholder: '+34 600 000 000'
    },
    {
      name: 'asistencia',
      label: '¿Confirmas tu asistencia?',
      type: FieldTypes.SELECT,
      required: true,
      options: ['Sí, asistiré', 'No podré asistir', 'Aún no lo sé']
    },
    {
      name: 'acompanantes',
      label: 'Número de acompañantes',
      type: FieldTypes.NUMBER,
      required: false,
      placeholder: '0'
    },
    {
      name: 'alergias',
      label: 'Alergias o intolerancias alimentarias',
      type: FieldTypes.TEXTAREA,
      required: false,
      placeholder: 'Indica si tienes alguna alergia o intolerancia'
    },
    {
      name: 'comentarios',
      label: 'Comentarios adicionales',
      type: FieldTypes.TEXTAREA,
      required: false,
      placeholder: 'Cualquier cosa que quieras compartir con nosotros'
    }
  ],
  submitText: 'Enviar confirmación',
  successMessage: '¡Gracias por confirmar! Hemos recibido tu respuesta.',
  errorMessage: 'Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.',
  googleScriptUrl: ''
};

