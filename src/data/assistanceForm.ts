import type { FormConfig } from '../types/form';
import type { FieldConfig } from '../types/field';
import { FieldTypes } from '../types/fieldTypes';

export const CHILD_AGES = ['Bebé (0-2)', 'Niño (3-10)', 'Preadolescente (11-13)'];

const adultAges = ['Adolescente (14-17)', 'Adulto (18+)'];

const allAges = [
  ...CHILD_AGES,
  ...adultAges
];

const relationOptions = ['Pareja', 'Hijo/a', 'Otro'];

export const MENU_TYPES = {
  ADULT: 'Menú de adulto',
  CHILD: 'Menú infantil',
};

const menuOptions = [MENU_TYPES.ADULT, MENU_TYPES.CHILD];

export const assistanceForm: FormConfig = {
  title: 'Confirma tu asistencia',
  description: 'Por favor, completa el formulario para confirmar tu asistencia a la boda.',
  fields: [
    {
      name: 'name',
      label: 'Nombre completo',
      type: FieldTypes.TEXT,
      required: true,
      placeholder: 'Ej: Juan Pérez'
    },
    {
      name: 'age',
      label: 'Edad',
      type: FieldTypes.SELECT,
      required: true,
      options: adultAges
    },
    {
      name: 'menu_type',
      label: 'Tipo de menú',
      type: FieldTypes.SELECT,
      required: true,
      options: menuOptions,
      defaultValue: MENU_TYPES.ADULT
    },
    {
      name: 'phone',
      label: 'Teléfono',
      type: FieldTypes.TEL,
      required: true,
      placeholder: '+34 600 000 000'
    },
    {
      name: 'allergies',
      label: 'Alergias o intolerancias alimentarias',
      type: FieldTypes.TEXTAREA,
      required: false,
      placeholder: 'Indica si tienes alguna alergia o intolerancia'
    },
    {
      name: 'comments',
      label: 'Comentarios adicionales',
      type: FieldTypes.TEXTAREA,
      required: false,
      placeholder: 'Cualquier cosa que quieras compartir con nosotros'
    },
    {
      name: 'bus',
      label: 'Indique si necesita/necesitan autobús',
      type: FieldTypes.SELECT,
      required: true,
      options: ['Sí', 'No']
    },
    {
      name: 'companions',
      label: '¿Cuántas personas acompañan?',
      type: FieldTypes.SELECT,
      required: true,
      options: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    }
  ],
  submitText: 'Enviar confirmación',
  successMessage: '¡Gracias por confirmar! Hemos recibido tu respuesta.',
  errorMessage: 'Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.',
  googleScriptUrl: ''
};

export const companionFields: FieldConfig[] = [
  {
    name: 'name',
    label: 'Nombre completo',
    type: FieldTypes.TEXT,
    required: true,
    placeholder: 'Nombre completo',
  },
  {
    name: 'relation',
    label: 'Relación',
    type: FieldTypes.SELECT,
    required: true,
    options: relationOptions,
  },
  {
    name: 'age',
    label: 'Rango de edad',
    type: FieldTypes.SELECT,
    required: true,
    options: allAges,
  },
  {
    name: 'menu_type',
    label: 'Tipo de menú',
    type: FieldTypes.SELECT,
    required: true,
    options: menuOptions,
    defaultValue: MENU_TYPES.ADULT
  },
  {
    name: 'allergies',
    label: 'Alergias o intolerancias',
    type: FieldTypes.TEXT,
    required: true,
    placeholder: 'Indica si tiene alguna alergia o intolerancia',
  },
];
