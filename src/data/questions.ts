import type { Question } from '../types/question'; 

export const menu: Question[] = [
  {
    id: 'rsvp',
    title: 'Confirmar asistencia',
    content: 'Podéis decirnos si venís a través del formulario de la web. ¡Hacedlo antes del 25/02/2026 para que podamos organizar todo genial!'
  },
  {
    id: 'dataError',
    title: 'Corrección de datos del formulario de asistencia',
    content: 'No pasa nada 😊. Mándanos un WhatsApp a alguno de los contactos de la web y corregiremos los datos sin problema.'
  },
  {
    id: 'parking',
    title: 'Parking para invitados',
    content: 'Hay aparcamiento gratuito para los invitados en el establecimiento del convite. Para la iglesia, hay varios parkings de pago cerca; el más cercano es el del Mercado Colón.'
  },
  {
    id: 'accommodation',
    title: 'Recomendación de alojamiento',
    content: 'Si necesitáis alojamiento, os recomendamos que sea cerca del lugar del convite o cerca de la iglesia, ya que será allí donde el autobús os dejará al finalizar la fiesta.'
  },  
  {
    id: 'shoes',
    title: 'Calzado',
    content: 'Os invitamos a traer un segundo par de zapatos cómodos. La fiesta no termina… solo cambian los zapatos ✨.'
  },
  {
    id: 'wardrobe',
    title: 'Guardarropa',
    content: 'Hay un guardarropa disponible durante el convite para que podáis dejar vuestros abrigos y cosas cómodamente.'
  },
  {
    id: 'infantilMenu',
    title: 'Menú infantil',
    content: 'El menú infantil incluye: entrantes, hamburguesa de ternera con patatas, helado con toppings y bebida. ¡Todo pensado para los peques!'
  },
  {
    id: 'specialDiets',
    title: 'Dietas especiales',
    content: 'Si algún invitado tiene alergias, intolerancias, está embarazada o sigue alguna dieta especial, avisadnos con antelación en el formulario o directamente para poder solicitar su menú especial.\n\nDurante todo el evento (cóctel y menú), habrá platos y bandejas específicas para estos casos; intentaremos estar pendientes en todo momento, pero si fuera necesario, indicádselo al camarero, que se encargará de servir los platos separados.'
  },
  {
    id: 'tableAssignment',
    title: 'Buscar tu mesa',
    content: 'Cada invitado podrá ver su mesa en el sitting plan que estará disponible en la zona del convite.'
  }
];
