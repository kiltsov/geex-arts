/**
 * Инициализация формы сборки проекта
 * Оптимизированная версия с исправлением бага истории браузера
 */
function buildFormInit() {
  // Конфигурация элементов формы
  const formConfig = {
    form: document.querySelector('.wf-form-Build-Form'),
    submitWrapper: document.getElementById('buildFormSubmitWrapper'),
    submit: document.getElementById('buildFormSubmit'),
    input: document.getElementById('buildFormInput'),
    hiddenInput: document.getElementById('buildFormHiddenInput'),
    radioPromptAdmin: document.getElementById('promptAdmin'),
    radioPromptCRM: document.getElementById('radioPromptCRM'),
    radioPromptPortal: document.getElementById('promptPortal'),
    radioPromptInventory: document.getElementById('promptInventory'),
    radioIntegration: document.querySelectorAll('.build-form__radio-input-integ'),
  };

  // Проверка наличия необходимых элементов
  if (!formConfig.form || !formConfig.submitWrapper || !formConfig.input) {
    console.error('Required form elements not found');
    return;
  }

  const BASE_URL = 'https://app.jetadmin.io/projects';
  const prompts = {
    promptAdmin: 'Admin panel on top of my data for managing content',
    radioPromptCRM: 'Custom CRM – Custom CRM on top of my data for managing leads and customer relationships',
    promptPortal: 'Customer Portal – Customer portal on top of my data for secure self-service access',
    promptInventory: 'Dashboard – Dashboard on top of my data for tracking metrics and insights',
  };

  let selectedPrompt = '';
  let selectedIntegration = '';

  // Обновление состояния UI
  const updateUIState = () => {
    const hasInput = formConfig.input.value.trim().length > 0;
    formConfig.submitWrapper.classList.toggle('is-disable', !hasInput);
  };

  // Обновление скрытого поля
  const updateHiddenInput = () => {
    if (!formConfig.hiddenInput) return;

    const prompt = formConfig.input.value.trim();
    if (!prompt) {
      formConfig.hiddenInput.value = '';
      return;
    }

    const promptEncoded = encodeURIComponent(prompt);
    const resource = selectedIntegration
      ? `&create_with_prompt_resource=${encodeURIComponent(selectedIntegration)}`
      : '';
    formConfig.hiddenInput.value = `?create_with_prompt=${promptEncoded}${resource}`;
  };

  // Обработка отправки формы
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const prompt = formConfig.input.value.trim();
    if (!prompt) return;

    const promptEncoded = encodeURIComponent(prompt);
    const resource = selectedIntegration
      ? `&create_with_prompt_resource=${encodeURIComponent(selectedIntegration)}`
      : '';
    const query = `?create_with_prompt=${promptEncoded}${resource}`;

    // Сохраняем состояние формы в sessionStorage перед редиректом
    sessionStorage.setItem('buildFormState', JSON.stringify({
      prompt,
      selectedIntegration,
    }));

    window.location.href = `${BASE_URL}${query}`;
  };

  // Восстановление состояния формы при возврате назад
  const restoreFormState = () => {
    const savedState = sessionStorage.getItem('buildFormState');
    if (savedState) {
      try {
        const { prompt, selectedIntegration: savedIntegration } = JSON.parse(savedState);
        if (prompt) {
          formConfig.input.value = prompt;
          selectedIntegration = savedIntegration || '';
          
          // Обновляем выбранную интеграцию если она была
          if (savedIntegration) {
            const integrationRadio = document.querySelector(`.build-form__radio-input-integ[value="${savedIntegration}"]`);
            if (integrationRadio) {
              integrationRadio.checked = true;
              integrationRadio.dispatchEvent(new Event('change', { bubbles: true }));
            }
          }
          
          updateUIState();
          updateHiddenInput();
        }
      } catch (e) {
        console.error('Error restoring form state:', e);
      } finally {
        sessionStorage.removeItem('buildFormState');
      }
    }
  };

  // Обработка изменения радиокнопок
  const handleRadioChange = (e) => {
    const radio = e.target;
    const isPrompt = radio.name === 'radioPrompts';
    const isIntegration = radio.name === 'selectedIntegration';
    const container = radio.closest(isPrompt ? '.build-form_radio' : '.build-form_radio-integration');

    // Управление классами активности
    if (container) {
      const activeClass = isPrompt ? '.build-form_radio.is-active' : '.build-form_radio-integration.is-active';
      document.querySelectorAll(activeClass).forEach((el) => el.classList.remove('is-active'));
      container.classList.add('is-active');
    }

    // Обновление значений
    if (isPrompt) {
      selectedPrompt = prompts[radio.id] || '';
      formConfig.input.value = selectedPrompt;
    } else if (isIntegration) {
      selectedIntegration = radio.value.trim();
    }

    updateHiddenInput();
    updateUIState();
  };

  // Инициализация обработчиков событий
  const initEventListeners = () => {
    // Обработчики для радиокнопок prompt
    [
      formConfig.radioPromptAdmin,
      formConfig.radioPromptCRM,
      formConfig.radioPromptPortal,
      formConfig.radioPromptInventory,
    ].forEach((radio) => {
      radio?.addEventListener('change', handleRadioChange);
    });

    // Обработчики для радиокнопок интеграции
    formConfig.radioIntegration.forEach((radio) => {
      radio.addEventListener('change', handleRadioChange);
    });

    // Общие обработчики
    formConfig.form.addEventListener('submit', handleFormSubmit);
    formConfig.input.addEventListener('input', updateUIState);
  };

  // Инициализация
  const init = () => {
    restoreFormState();
    initEventListeners();
    updateUIState(); // Проверяем начальное состояние
  };

  init();
}

/**
 * Инициализация слайдера Splide
 */
function splideBuildInit() {
  const splideElement = document.getElementById('splideBuild');
  if (!splideElement) return;

  const splide = new Splide(splideElement, {
    type: 'loop',
    perPage: 5,
    perMove: 5,
    gap: '8px',
    speed: 600,
    pagination: false,
    arrows: false,
    breakpoints: {
      768: {
        perPage: 5,
        perMove: 5,
      },
      480: {
        gap: '3px',
        perPage: 4,
        perMove: 4,
      },
    },
  });

  splide.mount();

  const nextButton = document.querySelector('[build-form=next]');
  nextButton?.addEventListener('click', () => splide.go('>'));
}

/**
 * Инициализация первой интеграции как активной
 */
function initFirstIntegration() {
  const firstIntegration = document.querySelector('.build-form__data-wrapper .build-form_radio-integration');
  if (!firstIntegration) return;

  firstIntegration.classList.add('is-active');
  const input = firstIntegration.querySelector('input[type="radio"]');
  if (input) {
    input.checked = true;
    input.dispatchEvent(new Event('change', { bubbles: true }));
  }
}

/**
 * Инициализация тултипов
 */
function initTooltips() {
  if (typeof tippy === 'function') {
    tippy('[data-tippy-content]', {
      placement: 'bottom',
      arrow: true,
      theme: 'light',
      delay: [0, 0],
      animation: 'fade',
    });
  }
}

// Основная инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
  initFirstIntegration();
  buildFormInit();
  splideBuildInit();
  initTooltips();
});