import type { Contact } from '../types/contact';

import groomImage from '@assets/groom.png';
import brideImage from '@assets/bride.png';
import groomAltImage from '@assets/groom-alt.png';
import brideAltImage from '@assets/bride-alt.png';

import groomMobileImage from '@assets/groom-mobile.jpeg';
import brideMobileImage from '@assets/bride-mobile.jpeg';
import groomAltMobileImage from '@assets/groom-alt-mobile.jpeg';
import brideAltMobileImage from '@assets/bride-alt-mobile.jpeg';

// Contact data from the environment, so the public build stays anonymized
const env = import.meta.env;

export const contacts: Contact[] = [
  {
    id: 'groom',
    name: env.GROOM_NAME ?? 'Novio',
    email: env.GROOM_EMAIL ?? 'novio@example.com',
    phone: env.GROOM_PHONE,
    role: 'Novio',
    avatar: groomImage,
    avatarAlt: groomAltImage,
    avatarMobile: groomMobileImage,
    avatarAltMobile: groomAltMobileImage,
  },
  {
    id: 'bride',
    name: env.BRIDE_NAME ?? 'Novia',
    email: env.BRIDE_EMAIL ?? 'novia@example.com',
    phone: env.BRIDE_PHONE,
    role: 'Novia',
    avatar: brideImage,
    avatarAlt: brideAltImage,
    avatarMobile: brideMobileImage,
    avatarAltMobile: brideAltMobileImage,
  },
];