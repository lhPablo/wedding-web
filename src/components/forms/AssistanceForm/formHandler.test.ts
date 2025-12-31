import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  validateFormData,
  validateCompanions,
  isRateLimited,
  recordSubmission,
  getSubmissions,
  RATE_LIMIT_MAX,
  RATE_LIMIT_WINDOW_MS,
} from './formHandler';

describe('validateFormData', () => {
  const validData = {
    name: 'Juan Pérez',
    age: 'Adulto (18+)',
    menu_type: 'Menú de adulto',
    phone: '+34600000000',
    bus: 'Sí',
    companions: '0',
  };

  it('should return null for valid data', () => {
    expect(validateFormData(validData)).toBeNull();
  });

  it('should return error when name is missing', () => {
    const data = { ...validData, name: '' };
    expect(validateFormData(data)).toBe('El nombre es obligatorio');
  });

  it('should return error when name is only whitespace', () => {
    const data = { ...validData, name: '   ' };
    expect(validateFormData(data)).toBe('El nombre es obligatorio');
  });

  it('should return error when age is missing', () => {
    const data = { ...validData, age: '' };
    expect(validateFormData(data)).toBe('Por favor, indica tu rango de edad');
  });

  it('should return error when menu_type is missing', () => {
    const data = { ...validData, menu_type: '' };
    expect(validateFormData(data)).toBe('Por favor, indica el tipo de menú');
  });

  it('should return error when phone is missing', () => {
    const data = { ...validData, phone: '' };
    expect(validateFormData(data)).toBe('El teléfono es obligatorio');
  });

  it('should return error when bus is missing', () => {
    const data = { ...validData, bus: '' };
    expect(validateFormData(data)).toBe('Por favor, indica si necesitas autobús');
  });

  it('should return error when comments exceed 5000 characters', () => {
    const data = { ...validData, comments: 'a'.repeat(5001) };
    expect(validateFormData(data)).toBe('Los comentarios son demasiado largos (máximo 5000 caracteres)');
  });

  it('should allow comments up to 5000 characters', () => {
    const data = { ...validData, comments: 'a'.repeat(5000) };
    expect(validateFormData(data)).toBeNull();
  });
});

describe('validateCompanions', () => {
  it('should return null when no companions', () => {
    const data = { companions: '0' };
    expect(validateCompanions(data)).toBeNull();
  });

  it('should return null for valid companion data', () => {
    const data = {
      companions: '1',
      companion_1_name: 'María García',
      companion_1_relation: 'Pareja',
      companion_1_age: 'Adulto (18+)',
      companion_1_menu_type: 'Menú de adulto',
    };
    expect(validateCompanions(data)).toBeNull();
  });

  it('should return error when companion name is missing', () => {
    const data = {
      companions: '1',
      companion_1_name: '',
      companion_1_relation: 'Pareja',
      companion_1_age: 'Adulto (18+)',
      companion_1_menu_type: 'Menú de adulto',
    };
    expect(validateCompanions(data)).toBe('Por favor, indica el nombre del acompañante 1');
  });

  it('should return error when companion relation is missing', () => {
    const data = {
      companions: '1',
      companion_1_name: 'María García',
      companion_1_relation: '',
      companion_1_age: 'Adulto (18+)',
      companion_1_menu_type: 'Menú de adulto',
    };
    expect(validateCompanions(data)).toBe('Por favor, indica la relación del acompañante 1');
  });

  it('should return error when companion age is missing', () => {
    const data = {
      companions: '1',
      companion_1_name: 'María García',
      companion_1_relation: 'Pareja',
      companion_1_age: '',
      companion_1_menu_type: 'Menú de adulto',
    };
    expect(validateCompanions(data)).toBe('Por favor, indica el rango de edad del acompañante 1');
  });

  it('should return error when companion menu_type is missing', () => {
    const data = {
      companions: '1',
      companion_1_name: 'María García',
      companion_1_relation: 'Pareja',
      companion_1_age: 'Adulto (18+)',
      companion_1_menu_type: '',
    };
    expect(validateCompanions(data)).toBe('Por favor, indica el tipo de menú del acompañante 1');
  });

  it('should validate multiple companions', () => {
    const data = {
      companions: '2',
      companion_1_name: 'María García',
      companion_1_relation: 'Pareja',
      companion_1_age: 'Adulto (18+)',
      companion_1_menu_type: 'Menú de adulto',
      companion_2_name: '',
      companion_2_relation: 'Hijo/a',
      companion_2_age: 'Niño (3-10)',
      companion_2_menu_type: 'Menú infantil',
    };
    expect(validateCompanions(data)).toBe('Por favor, indica el nombre del acompañante 2');
  });
});

describe('Rate Limiting', () => {
  let localStorageMock: Record<string, string>;

  beforeEach(() => {
    localStorageMock = {};
    
    vi.stubGlobal('localStorage', {
      getItem: (key: string) => localStorageMock[key] ?? null,
      setItem: (key: string, value: string) => { localStorageMock[key] = value; },
      removeItem: (key: string) => { delete localStorageMock[key]; },
      clear: () => { localStorageMock = {}; },
    });
    
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('should return empty array when no submissions', () => {
    expect(getSubmissions()).toEqual([]);
  });

  it('should not be rate limited with no submissions', () => {
    expect(isRateLimited()).toBe(false);
  });

  it('should record submission correctly', () => {
    const now = Date.now();
    vi.setSystemTime(now);
    
    recordSubmission();
    
    const submissions = getSubmissions();
    expect(submissions).toHaveLength(1);
    expect(submissions[0]).toBe(now);
  });

  it('should enforce rate limit and reset after time window', () => {
    const now = Date.now();
    vi.setSystemTime(now);
  
    for (let i = 0; i < RATE_LIMIT_MAX; i++) {
      recordSubmission();
    }
  
    expect(isRateLimited()).toBe(true);
  
    // Advance time beyond the window
    vi.setSystemTime(now + RATE_LIMIT_WINDOW_MS + 1000);
  
    expect(isRateLimited()).toBe(false);
  });  

  it('should not be rate limited before max submissions', () => {
    const now = Date.now();
    vi.setSystemTime(now);
    
    for (let i = 0; i < RATE_LIMIT_MAX - 1; i++) {
      recordSubmission();
    }
    
    expect(isRateLimited()).toBe(false);
  });
});
