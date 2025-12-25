import { CHILD_AGES, MENU_TYPES } from '@data/assistanceForm';

export function initCompanionFields() {
  const isLimitedAccess = localStorage.getItem('accessGranted') === 'limited';

  const companionsSelect = document.querySelector(
    'select[name="companions"]'
  ) as HTMLSelectElement;

  const companionsSection = document.querySelector(
    '[data-companions-section]'
  ) as HTMLElement;

  const companionCards = document.querySelectorAll(
    '[data-companion-card]'
  ) as NodeListOf<HTMLElement>;

  if (!companionsSelect || !companionsSection) return;


  //New request: certain guests are not allowed to bring companions
  if (isLimitedAccess) {
    const selectContainer = companionsSelect.parentElement as HTMLElement;
    if (selectContainer) {
      selectContainer.hidden = true;
    }
    companionsSelect.value = '0';
    companionsSelect.removeAttribute('required');
    companionsSection.hidden = true;
    return;
  }

  initAgeMenuListeners(companionCards);

  companionsSelect.addEventListener('change', (e) => {
    const target = e.target as HTMLSelectElement;
    const count = parseInt(target.value) || 0;
    updateCompanionCards(companionsSection, companionCards, count);
  });

  const initialCount = parseInt(companionsSelect.value) || 0;
  updateCompanionCards(companionsSection, companionCards, initialCount);
}

function initAgeMenuListeners(companionCards: NodeListOf<HTMLElement>) {
  companionCards.forEach((card, index) => {
    const ageSelect = card.querySelector(`select[name="companion_${index + 1}_age"]`) as HTMLSelectElement;
    const menuSelect = card.querySelector(`select[name="companion_${index + 1}_menu_type"]`) as HTMLSelectElement;

    if (ageSelect && menuSelect) {
      ageSelect.addEventListener('change', () => {
        updateMenuBasedOnAge(ageSelect, menuSelect);
      });
    }
  });
}

function updateMenuBasedOnAge(ageSelect: HTMLSelectElement, menuSelect: HTMLSelectElement) {
  const selectedAge = ageSelect.value;
  
  if (CHILD_AGES.includes(selectedAge)) {
    menuSelect.value = MENU_TYPES.CHILD;
  } else {
    menuSelect.value = MENU_TYPES.ADULT;
  }
}

function updateCompanionCards(companionsSection: HTMLElement, companionCards: NodeListOf<HTMLElement>, count: number) {
  companionsSection.hidden = count === 0;

  companionCards.forEach((card, index) => {
    const isVisible = index < count;
    card.hidden = !isVisible;

    const requiredFields = card.querySelectorAll(
      'input:not([type="checkbox"])[required], select[required]'
    );

    requiredFields.forEach((field) => {
      if (isVisible) {
        field.setAttribute('required', '');
      } else {
        field.removeAttribute('required');
      }
    });

    if (!isVisible) {
      clearForm(card);
    }
  });
}

function clearForm(card: HTMLElement) {
  card.querySelectorAll('input, select').forEach((field) => {
    if (field instanceof HTMLInputElement) {
      field.value = '';
    } else if (field instanceof HTMLSelectElement) {
      field.selectedIndex = 0;
    }
  });
}
