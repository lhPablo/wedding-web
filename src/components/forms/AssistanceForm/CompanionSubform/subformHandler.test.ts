import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import {
  initCompanionFields,
  updateMenuBasedOnAge,
  updateCompanionCards,
  clearForm,
} from './subformHandler';
import { CHILD_AGES, MENU_TYPES } from '@data/assistanceForm';
import { ACCESS_STORAGE_KEY, ACCESS_LEVELS } from '@lib/authConstants';

function createCompanionCard(index: number): HTMLElement {
  const card = document.createElement('div');
  card.setAttribute('data-companion-card', '');
  card.innerHTML = `
    <input type="text" name="companion_${index}_name" required />
    <select name="companion_${index}_age" required>
      <option value="">Selecciona</option>
      <option value="Bebé (0-2)">Bebé (0-2)</option>
      <option value="Niño (3-10)">Niño (3-10)</option>
      <option value="Adulto (18+)">Adulto (18+)</option>
    </select>
    <select name="companion_${index}_menu_type" required>
      <option value="${MENU_TYPES.ADULT}">${MENU_TYPES.ADULT}</option>
      <option value="${MENU_TYPES.CHILD}">${MENU_TYPES.CHILD}</option>
    </select>
  `;
  return card;
}

function createCompanionFormDOM(numCards: number = 2) {
  const container = document.createElement('div');
  
  const selectContainer = document.createElement('div');
  const companionsSelect = document.createElement('select');
  companionsSelect.name = 'companions';
  companionsSelect.innerHTML = `
    <option value="0">0</option>
    <option value="1">1</option>
    <option value="2">2</option>
  `;
  selectContainer.appendChild(companionsSelect);
  container.appendChild(selectContainer);

  const companionsSection = document.createElement('div');
  companionsSection.setAttribute('data-companions-section', '');
  
  for (let i = 1; i <= numCards; i++) {
    companionsSection.appendChild(createCompanionCard(i));
  }
  
  container.appendChild(companionsSection);
  document.body.appendChild(container);
  
  return { companionsSelect, companionsSection, container };
}

function createAgeSelect(value: string): HTMLSelectElement {
  const ageSelect = document.createElement('select');
  ageSelect.innerHTML = `
    <option value="">Selecciona</option>
    <option value="Bebé (0-2)">Bebé (0-2)</option>
    <option value="Niño (3-10)">Niño (3-10)</option>
    <option value="Preadolescente (11-13)">Preadolescente (11-13)</option>
    <option value="Adulto (18+)">Adulto (18+)</option>
  `;
  ageSelect.value = value;
  return ageSelect;
}

function createMenuSelect(): HTMLSelectElement {
  const menuSelect = document.createElement('select');
  menuSelect.innerHTML = `
    <option value="${MENU_TYPES.ADULT}">${MENU_TYPES.ADULT}</option>
    <option value="${MENU_TYPES.CHILD}">${MENU_TYPES.CHILD}</option>
  `;
  return menuSelect;
}

describe('updateMenuBasedOnAge', () => {
  it('should set child menu for child ages', () => {
    CHILD_AGES.forEach(childAge => {
      const ageSelect = createAgeSelect(childAge);
      const menuSelect = createMenuSelect();
      
      updateMenuBasedOnAge(ageSelect, menuSelect);
      
      expect(menuSelect.value).toBe(MENU_TYPES.CHILD);
    });
  });

  it('should set adult menu for adult ages', () => {
    const ageSelect = createAgeSelect('Adulto (18+)');
    const menuSelect = createMenuSelect();
    menuSelect.value = MENU_TYPES.CHILD;

    updateMenuBasedOnAge(ageSelect, menuSelect);
    
    expect(menuSelect.value).toBe(MENU_TYPES.ADULT);
  });
});

describe('updateCompanionCards', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should hide section when count is 0', () => {
    const section = document.createElement('div');
    const cards = document.querySelectorAll('[data-companion-card]') as NodeListOf<HTMLElement>;
    
    updateCompanionCards(section, cards, 0);
    
    expect(section.hidden).toBe(true);
  });

  it('should show section when count > 0', () => {
    const section = document.createElement('div');
    section.hidden = true;

    const card = createCompanionCard(1);
    document.body.appendChild(card);

    const cards = document.querySelectorAll('[data-companion-card]') as NodeListOf<HTMLElement>;
    
    updateCompanionCards(section, cards, 1);
    
    expect(section.hidden).toBe(false);
  });

  it('should show only the specified number of cards', () => {
    const section = document.createElement('div');

    const card1 = createCompanionCard(1);
    const card2 = createCompanionCard(2);

    document.body.appendChild(card1);
    document.body.appendChild(card2);

    const cards = document.querySelectorAll('[data-companion-card]') as NodeListOf<HTMLElement>;
    
    updateCompanionCards(section, cards, 1);
    
    expect(card1.hidden).toBe(false);
    expect(card2.hidden).toBe(true);
  });

  it('should remove required attribute from hidden cards', () => {
    const section = document.createElement('div');
    const card = createCompanionCard(1);

    document.body.appendChild(card);
    const cards = document.querySelectorAll('[data-companion-card]') as NodeListOf<HTMLElement>;
    
    updateCompanionCards(section, cards, 0);
    
    const requiredFields = card.querySelectorAll('[required]');
    expect(requiredFields.length).toBe(0);
  });

  it('should keep required attribute on visible cards', () => {
    const section = document.createElement('div');
    const card = createCompanionCard(1);

    document.body.appendChild(card);
    const cards = document.querySelectorAll('[data-companion-card]') as NodeListOf<HTMLElement>;
    
    updateCompanionCards(section, cards, 1);
    
    const nameInput = card.querySelector('input[name="companion_1_name"]');
    expect(nameInput?.hasAttribute('required')).toBe(true);
  });
});

describe('clearForm', () => {
  it('should clear input values', () => {
    const card = createCompanionCard(1);
    const input = card.querySelector('input') as HTMLInputElement;

    input.value = 'Test Name';
    
    clearForm(card);
    
    expect(input.value).toBe('');
  });
});

describe('initCompanionFields', () => {
  let localStorageMock: Record<string, string>;

  beforeEach(() => {
    document.body.innerHTML = '';
    localStorageMock = {};
    
    vi.stubGlobal('localStorage', {
      getItem: (key: string) => localStorageMock[key] ?? null,
      setItem: (key: string, value: string) => { localStorageMock[key] = value; },
      removeItem: (key: string) => { delete localStorageMock[key]; },
      clear: () => { localStorageMock = {}; },
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should hide companions section for limited access', () => {
    localStorageMock[ACCESS_STORAGE_KEY] = ACCESS_LEVELS.LIMITED;
    const { companionsSelect, companionsSection } = createCompanionFormDOM();
    
    initCompanionFields();
    
    expect(companionsSection.hidden).toBe(true);
    expect(companionsSelect.value).toBe('0');
    expect(companionsSelect.parentElement?.hidden).toBe(true);
  });

  it('should show companions select for full access', () => {
    localStorageMock[ACCESS_STORAGE_KEY] = ACCESS_LEVELS.FULL;
    const { companionsSelect } = createCompanionFormDOM();
    
    initCompanionFields();
    
    expect(companionsSelect.parentElement?.hidden).toBe(false);
  });

  it('should update cards when companions select changes', () => {
    localStorageMock[ACCESS_STORAGE_KEY] = ACCESS_LEVELS.FULL;
    const { companionsSelect, companionsSection } = createCompanionFormDOM();
    
    initCompanionFields();
    
    companionsSelect.value = '1';
    companionsSelect.dispatchEvent(new Event('change'));
    
    expect(companionsSection.hidden).toBe(false);
  });
});
