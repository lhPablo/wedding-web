import type { Location } from '../types/location';

import transportImage from '@assets/transport.png';

export const transports: Location[] = [
  {
    id: 'transport-go',
    title: 'Autobús de ida',
    image: transportImage.src,
    description: 'Salida desde Plaza Mayor hacia la Finca',
    address: 'Plaza Mayor, Ciudad',
    mapLink: 'https://www.google.com/maps',
    time: '13:30',
    badge: 'Ida'
  },
  {
    id: 'transport-return',
    title: 'Autobús de vuelta',
    image: transportImage.src,
    description: 'Regreso desde la Finca hacia Plaza Mayor',
    address: 'Finca Los Sueños',
    mapLink: 'https://www.google.com/maps',
    time: '02:00',
    badge: 'Vuelta'
  },
];