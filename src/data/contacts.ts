import type { Contact } from '../types/contact';

import groomImage from '@assets/groom.png';
import brideImage from '@assets/bride.png';

import groomFocusImage from '@assets/groom-focus.png';
import brideFocusImage from '@assets/bride-focus.png';

export const contacts: Contact[] = [
  { 
    id: 'groom', 
    name: 'Novio', 
    email: 'novio@example.com', 
    phone: '[redacted]',
    role: 'Novio',
    avatar: groomImage.src,
    avatarFocus: groomFocusImage.src,
  },
  { 
    id: 'bride', 
    name: 'Novia', 
    email: 'novia@example.com', 
    phone: '[redacted]',
    role: 'Novia',
    avatar: brideImage.src,
    avatarFocus: brideFocusImage.src,
  },
];