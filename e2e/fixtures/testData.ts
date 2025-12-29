export const PASSWORDS = {
  FULL_ACCESS: process.env.TEST_FULL_ACCESS_KEY || '',
  LIMITED_ACCESS: process.env.TEST_LIMITED_ACCESS_KEY || '',
};

export const MAIN_FORM_DATA = {
  name: 'Test Usuario E2E',
  age: 'Adulto (18+)',
  menuType: 'Menú de adulto',
  phone: '+34600000000',
  bus: 'No',
  companions: '0',
};

export const MAIN_FORM_DATA_WITH_COMPANION = {
  name: 'Test Usuario con Acompañante',
  age: 'Adulto (18+)',
  menuType: 'Menú de adulto',
  phone: '+34600000001',
  bus: 'Sí',
  companions: '1',
};

export const LIMITED_FORM_DATA = {
  name: 'Test Usuario Limitado E2E',
  age: 'Adulto (18+)',
  menuType: 'Menú de adulto',
  phone: '+34600000002',
  bus: 'No',
};

export const COMPANION_DATA = {
  name: 'Acompañante Test',
  relation: 'Pareja',
  age: 'Adulto (18+)',
  menuType: 'Menú de adulto',
  allergies: 'Ninguna',
};
