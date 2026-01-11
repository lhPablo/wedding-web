import type { Contact } from '../types/contact';

import groomImage from '@assets/groom.png';
import brideImage from '@assets/bride.png';
import groomAltImage from '@assets/groom-alt.png';
import brideAltImage from '@assets/bride-alt.png';

import groomMobileImage from '@assets/groom-mobile.jpeg';
import brideMobileImage from '@assets/bride-mobile.jpeg';
import groomAltMobileImage from '@assets/groom-alt-mobile.jpeg';
import brideAltMobileImage from '@assets/bride-alt-mobile.jpeg';

export const contacts: Contact[] = [
  { 
    id: 'groom', 
    name: 'Novio', 
    email: 'novio@example.com', 
    phone: '[redacted]',
    role: 'Novio',
    avatar: groomImage,
    avatarAlt: groomAltImage,
    avatarMobile: groomMobileImage,
    avatarAltMobile: groomAltMobileImage,
  },
  { 
    id: 'bride', 
    name: 'Novia', 
    email: 'novia@example.com', 
    phone: '[redacted]',
    role: 'Novia',
    avatar: brideImage,
    avatarAlt: brideAltImage,
    avatarMobile: brideMobileImage,
    avatarAltMobile: brideAltMobileImage,
  },
];