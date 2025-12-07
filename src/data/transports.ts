import type { Location } from '../types/location';

import transportImage from '@assets/transport.png';

export const transports: Location[] = [
  {
    id: 'transport-go',
    title: 'Transporte ida',
    image: transportImage.src,
    description: 'Salida 12:00 desde la iglesia',
    address: 'Dirección del transporte ida',
    mapLink: 'https://www.google.com/maps'
  },
  {
    id: 'transport-return',
    title: 'Transporte vuelta',
    image: transportImage.src,
    description: 'Salida 00:00 desde el lugar de la recepción',
    address: 'Dirección del transporte vuelta',
    mapLink: 'https://www.google.com/maps'
  },
];