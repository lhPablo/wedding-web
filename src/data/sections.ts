interface Section {
  id: string;
  title: string;
  warning?: string;
  reverseOnMobile?: boolean;
}

export const sections: Section[] = [
  { 
    id: 'home', 
    title: 'Inicio' 
  },
  { 
    id: 'location', 
    title: 'Ubicación'
  },
  { 
    id: 'transport',
    title: 'Transporte',
    warning: '⚠️ El número de buses, horario y puntos de recogida se irán actualizando una vez tengamos confirmados el número de asistentes. Por favor, revisen esta sección a medida que se acerque la fecha de la boda.'
  },
  { 
    id: 'gift', 
    title: 'Regalos'
  },
  { 
    id: 'assistance', title: 'Asistencia'
  },
  {
    id: 'questions', title: 'FAQ' 
  },
  { 
    id: 'contact', title: 'Contacto', reverseOnMobile: true 
  }
];