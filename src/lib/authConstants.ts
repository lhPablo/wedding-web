export const ACCESS_STORAGE_KEY = 'accessGranted';

export const ACCESS_LEVELS = {
  FULL: 'full',
  LIMITED: 'limited',
} as const;

export type AccessLevel = typeof ACCESS_LEVELS[keyof typeof ACCESS_LEVELS];
