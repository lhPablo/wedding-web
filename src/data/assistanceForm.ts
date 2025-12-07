import type { FormConfig } from '../types/form';

export const assistanceForm: FormConfig = {
  title: 'Confirma tu asistencia',
  description: 'Por favor, completa el formulario para confirmar tu asistencia a la boda.',
  fields: [
    {
      name: 'nombre',
      label: 'Nombre completo',
      type: 'text',
      required: true,
      placeholder: 'Ej: Juan Pérez'
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      placeholder: 'tu@email.com'
    },
    {
      name: 'telefono',
      label: 'Teléfono',
      type: 'tel',
      required: false,
      placeholder: '+34 600 000 000'
    },
    {
      name: 'asistencia',
      label: '¿Confirmas tu asistencia?',
      type: 'select',
      required: true,
      options: ['Sí, asistiré', 'No podré asistir', 'Aún no lo sé']
    },
    {
      name: 'acompanantes',
      label: 'Número de acompañantes',
      type: 'number',
      required: false,
      placeholder: '0'
    },
    {
      name: 'alergias',
      label: 'Alergias o intolerancias alimentarias',
      type: 'textarea',
      required: false,
      placeholder: 'Indica si tienes alguna alergia o intolerancia'
    },
    {
      name: 'comentarios',
      label: 'Comentarios adicionales',
      type: 'textarea',
      required: false,
      placeholder: 'Cualquier cosa que quieras compartir con nosotros'
    }
  ],
  submitText: 'Enviar confirmación',
  successMessage: '¡Gracias por confirmar! Hemos recibido tu respuesta.',
  errorMessage: 'Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.',
  googleScriptUrl: ''
};

