import type { Contact } from '../types/contact';

import groomImage from '@assets/groom.png';
import brideImage from '@assets/bride.png';
import groomFocusImage from '@assets/groom-focus.png';
import brideFocusImage from '@assets/bride-focus.png';

import groomMobileImage from '@assets/groom-mobile.jpeg';
import brideMobileImage from '@assets/bride-mobile.jpeg';
import groomMobileFocusImage from '@assets/groom-focus-mobile.jpeg';
import brideMobileFocusImage from '@assets/bride-focus-mobile.jpeg';

export const contacts: Contact[] = [
  { 
    id: 'groom', 
    name: 'Novio', 
    email: 'novio@example.com', 
    phone: '[redacted]',
    role: 'Novio',
    avatar: groomImage.src,
    avatarFocus: groomFocusImage.src,
    avatarMobile: groomMobileImage.src,
    avatarFocusMobile: groomMobileFocusImage.src,
  },
  { 
    id: 'bride', 
    name: 'Novia', 
    email: 'novia@example.com', 
    phone: '[redacted]',
    role: 'Novia',
    avatar: brideImage.src,
    avatarFocus: brideFocusImage.src,
    avatarMobile: brideMobileImage.src,
    avatarFocusMobile: brideMobileFocusImage.src,
  },
];