import BookIcon from '../components/Icons/BookIcon.astro';
import HomeIcon from '../components/Icons/HomeIcon.astro';
import PhoneIcon from '../components/Icons/PhoneIcon.astro';
import LocationIcon from '../components/Icons/LocationIcon.astro';

export const sections = [
  { id: 'main', title: 'Main', Icon: HomeIcon, children: 'Te invitamos a celebrar nuestro gran día con nosotros' },
  { id: 'story', title: 'Our Story', Icon: BookIcon, children: 'Texto sobre Pablo y Paula...' },
  { id: 'location', title: 'Location', Icon: LocationIcon, children: 'Detalles del evento...' },
  { id: 'contact', title: 'Contact', Icon: PhoneIcon, children: 'Cómo encontrarnos...' },
];