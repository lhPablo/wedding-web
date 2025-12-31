import locationImage from '@assets/alcedo.webp';
import churchImage from '@assets/church.png';

import type { Location } from '../types/location';

export const locations: Location[] = [
  { 
    id: 'ceremony', 
    title: 'Basílica San Vicente Ferrer',
    image: churchImage.src,
    address: 'C/ de Ciril Amorós, 56, L\'Eixample, 46004 València, Valencia',
    mapLink: 'https://maps.app.goo.gl/WfaHeaY2ZUMKpYms8',
    time: '12:00',
    badge: 'Ceremonia'
  },
  { 
    id: 'banquet', 
    title: 'Mas d\'Alzedo',
    image: locationImage.src, 
    address: 'Av. del Turia, 1, 46190 Riba-roja de Túria, Valencia', 
    mapLink: 'https://maps.app.goo.gl/c32hbVWdLYL1rjMZ6',
    time: '14:15',
    badge: 'Convite'
  }
];