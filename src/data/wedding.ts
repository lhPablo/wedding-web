import type { Wedding } from 'src/types/wedding';
import weddingImageMobile from '@assets/hero-mobile.jpeg';
import weddingImageDesktop from '@assets/hero.png';

export const heroImages = {
  mobile: weddingImageMobile,
  desktop: weddingImageDesktop,
};

export const wedding: Wedding = {
  title: 'Pablo & Paula',
  imageMobile: weddingImageMobile.src,
  imageDesktop: weddingImageDesktop.src,
  date: '2026-03-28T12:00:00+02:00',
  iban: 'ES** **** **** **** **** ****'
};