import { wedding } from '@data/wedding';
import { locations } from '@data/locations';
import { contacts } from '@data/contacts';
import { menu } from '@data/questions';
import { transports } from '@data/transports';
import { assistanceForm } from '@data/assistanceForm';

import { SectionTypes } from 'src/types/sectionTypes';
import { MenuIconTypes } from 'src/types/menuIconTypes';

import type { Section } from 'src/types/section';

export const sectionConfig: Record<string, Section> = {
  home: { icon: MenuIconTypes.HOME, data: contacts, type: SectionTypes.HERO },
  gift: { icon: MenuIconTypes.GIFT, data: wedding.iban, type: SectionTypes.GIFT },
  assistance: { icon: MenuIconTypes.CONFIRM, data: assistanceForm, type: SectionTypes.FORM },
  location: { icon: MenuIconTypes.LOCATION, data: locations, type: SectionTypes.LOCATION },
  transport: { icon: MenuIconTypes.TRANSPORT, data: transports, type: SectionTypes.LOCATION },
  questions: { icon: MenuIconTypes.QUESTION, data: menu, type: SectionTypes.EXPANDABLE},
  contact: { icon: MenuIconTypes.PHONE, data: contacts, type: SectionTypes.CONTACT }
};
