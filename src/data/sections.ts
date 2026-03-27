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
    title: 'Transporte'
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