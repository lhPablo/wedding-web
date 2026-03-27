import type { Location } from '../types/location';

import outboundImage from '@assets/outbound-transport.webp';
import returnImage from '@assets/return-transport.webp';

export const transports: Location[] = [
  {
    id: 'outbound-transport',
    title: 'Autocares Navarro y Quesada',
    image: outboundImage,
    description: 'Salida cercana a la ceremonia hacia la ubicación del convite.',
    address: 'Gran Via del Marqués del Túria, 49, Ensanche, 46005 Valencia',
    mapLink: 'https://maps.app.goo.gl/5648r6g9LUTPd87a7',
    time: '13:15',
    badge: 'Salida'
  },
  {
    id: 'return-transport',
    title: 'Autocares Navarro y Quesada',
    image: returnImage,
    description: 'Regreso desde la entrada de Mas d\'Alzedo hacia el punto de recogida de la ceremonia.',
    address: 'Av. del Turia, 1, 46190 Riba-roja de Túria, Valencia',
    mapLink: 'https://maps.app.goo.gl/c32hbVWdLYL1rjMZ6',
    time: '00:00',
    badge: 'Regreso'
  },
];