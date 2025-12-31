import type { Location } from '../types/location';

import outboundImage from '@assets/outbound-transport.webp';
import returnImage from '@assets/return-transport.webp';

export const transports: Location[] = [
  {
    id: 'outbound-transport',
    title: 'Autocares Navarro y Quesada',
    image: outboundImage.src,
    description: 'Salida desde ubicación cercana a la ceremonia.',
    address: 'Gran Via del Marqués del Túria, 49, Ensanche, 46005 Valencia',
    mapLink: 'https://maps.app.goo.gl/5648r6g9LUTPd87a7',
    time: '14:00',
    badge: 'Ida'
  },
  {
    id: 'return-transport',
    title: 'Autocares Navarro y Quesada',
    image: returnImage.src,
    description: 'Regreso desde la entrada de Mas d\'Alzedo.',
    address: 'Av. del Turia, 1, 46190 Riba-roja de Túria, Valencia',
    mapLink: 'https://maps.app.goo.gl/c32hbVWdLYL1rjMZ6',
    time: '00:00',
    badge: 'Vuelta'
  },
];