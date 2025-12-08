import { wedding } from '@data/wedding';
import { locations } from '@data/locations';
import { contacts } from '@data/contacts';
import { menu } from '@data/questions';
import { transports } from '@data/transports';
import { assistanceForm } from '@data/assistanceForm';

import { SectionTypes } from 'src/types/sectionTypes';
import { IconTypes } from 'src/types/iconTypes';

import type { Section } from 'src/types/section';

export const sectionConfig: Record<string, Section> = {
  main: { icon: IconTypes.HOME, data: contacts, type: SectionTypes.HERO },
  gifts: { icon: IconTypes.GIFT, data: wedding.iban, type: SectionTypes.GIFT },
  assistance: { icon: IconTypes.CONFIRM, data: assistanceForm, type: SectionTypes.FORM },
  location: { icon: IconTypes.LOCATION, data: locations, type: SectionTypes.LOCATION },
  transport: { icon: IconTypes.TRANSPORT, data: transports, type: SectionTypes.LOCATION },
  questions: { icon: IconTypes.QUESTION, data: menu, type: SectionTypes.EXPANDABLE},
  contact: { icon: IconTypes.PHONE, data: contacts, type: SectionTypes.CONTACT }
};
