import locationImage from '@assets/location.png';
import churchImage from '@assets/church.png';

import type { Location } from '../types/location';

export const locations: Location[] = [
  { 
    id: 'loc1', 
    title: 'Lugar de la recepción',
    image: locationImage.src, 
    description: 'Dirección: Calle de los Sueños 123, Ciudad',
    address: 'Calle de los Sueños 123, Ciudad', 
    mapLink: 'https://www.google.com/maps' },
  { 
    id: 'loc2', 
    title: 'Iglesia',
    image: churchImage.src,
    description: 'Dirección: Calle de la Iglesia 123, Ciudad',
    address: 'Calle de la Iglesia 123, Ciudad',
    mapLink: 'https://www.google.com/maps' 
  }
];