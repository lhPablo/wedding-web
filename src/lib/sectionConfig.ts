import HomeIcon from '@components/ui/Icons/HomeIcon.astro';
import LocationIcon from '@components/ui/Icons/LocationIcon.astro';
import PhoneIcon from '@components/ui/Icons/PhoneIcon.astro';
import QuestionIcon from '@components/ui/Icons/QuestionIcon.astro';
import TransportIcon from '@components/ui/Icons/TransportIcon.astro';
import ConfirmIcon from '@components/ui/Icons/ConfirmIcon.astro';

import { SectionTypes } from '@lib/sectionTypes';

import { locations } from '@data/locations';
import { contacts } from '@data/contacts';
import { menu } from '@data/questions';
import { transports } from '@data/transports';
import { assistanceForm } from '@data/assistanceForm';

interface SectionConfig {
  Icon: any;
  data: any;
  type: SectionTypes;
}

export const sectionConfig: Record<string, SectionConfig> = {
  main: { Icon: HomeIcon, data: contacts, type: SectionTypes.HERO },
  location: { Icon: LocationIcon, data: locations, type: SectionTypes.LOCATION },
  transport: { Icon: TransportIcon, data: transports, type: SectionTypes.LOCATION },
  questions: { Icon: QuestionIcon, data: menu, type: SectionTypes.EXPANDABLE},
  assistance: { Icon: ConfirmIcon, data: assistanceForm, type: SectionTypes.FORM },
  contact: { Icon: PhoneIcon, data: contacts, type: SectionTypes.CONTACT }
};
