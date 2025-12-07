
import { wedding } from '@data/wedding';
import { locations } from '@data/locations';
import { contacts } from '@data/contacts';
import { menu } from '@data/questions';
import { transports } from '@data/transports';
import { assistanceForm } from '@data/assistanceForm';

import { SectionTypes } from '@lib/sectionTypes';

import type { Section } from 'src/types/section';

import HomeIcon from '@components/ui/Icons/HomeIcon.astro';
import LocationIcon from '@components/ui/Icons/LocationIcon.astro';
import PhoneIcon from '@components/ui/Icons/PhoneIcon.astro';
import QuestionIcon from '@components/ui/Icons/QuestionIcon.astro';
import TransportIcon from '@components/ui/Icons/TransportIcon.astro';
import ConfirmIcon from '@components/ui/Icons/ConfirmIcon.astro';
import GiftIcon from '@components/ui/Icons/GiftIcon.astro';

export const sectionConfig: Record<string, Section> = {
  main: { Icon: HomeIcon, data: contacts, type: SectionTypes.HERO },
  gifts: { Icon: GiftIcon, data: wedding.iban, type: SectionTypes.GIFT },
  assistance: { Icon: ConfirmIcon, data: assistanceForm, type: SectionTypes.FORM },
  location: { Icon: LocationIcon, data: locations, type: SectionTypes.LOCATION },
  transport: { Icon: TransportIcon, data: transports, type: SectionTypes.LOCATION },
  questions: { Icon: QuestionIcon, data: menu, type: SectionTypes.EXPANDABLE},
  contact: { Icon: PhoneIcon, data: contacts, type: SectionTypes.CONTACT }
};
