import type { Wedding } from 'src/types/wedding';
import heroMobileImage from '@assets/hero-mobile.png';
import heroDesktopImage from '@assets/hero.png';

export const heroImages = {
  mobile: heroMobileImage,
  desktop: heroDesktopImage,
};

export const wedding: Wedding = {
  title: 'Pablo & Paula',
  imageMobile: heroMobileImage.src,
  imageDesktop: heroDesktopImage.src,
  date: '2026-03-28T12:00:00+02:00',
  iban: 'ES** **** **** **** **** ****'
};