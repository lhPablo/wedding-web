import type { Wedding } from 'src/types/wedding';
import weddingImageMobile from '@assets/hero-mobile.jpg';
import weddingImageDesktop from '@assets/hero.jpg';

export const heroImages = {
  mobile: weddingImageMobile,
  desktop: weddingImageDesktop,
};

export const wedding: Wedding = {
  title: 'Pablo & Paula',
  imageMobile: weddingImageMobile.src,
  imageDesktop: weddingImageDesktop.src,
  date: '2026-03-28',
  iban: 'ES** **** **** **** **** ****'
};