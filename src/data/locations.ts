import locationImage from '@assets/location.png';
import churchImage from '@assets/church.png';

import type { Location } from '../types/location';

export const locations: Location[] = [
  { 
    id: 'loc1', 
    title: 'Ceremonia',
    image: churchImage.src,
    description: 'Parroquia de San José',
    address: 'Calle de la Iglesia 123, Ciudad',
    mapLink: 'https://www.google.com/maps',
    time: '12:00',
    badge: 'Ceremonia'
  },
  { 
    id: 'loc2', 
    title: 'Banquete',
    image: locationImage.src, 
    description: 'Finca Los Sueños',
    address: 'Calle de los Sueños 123, Ciudad', 
    mapLink: 'https://www.google.com/maps',
    time: '14:30',
    badge: 'Convite'
  }
];