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

  const BASE_URL = 'https://app.jetadmin.io/projects';
  const prompts = {
    promptAdmin: 'Admin panel on top of my data for managing content',
    radioPromptCRM: 'Custom CRM – Custom CRM on top of my data for managing leads and customer relationships',
    promptPortal: 'Customer Portal – Customer portal on top of my data for secure self-service access',
    promptInventory: 'Dashboard – Dashboard on top of my data for tracking metrics and insights',
  };

  let selectedPrompt = '';
  let selectedIntegration = '';
  formConfig.submitWrapper.classList.add('is-disable');

  // Общие функции
  const updateUIState = () => {
    const hasInput = formConfig.input.value.trim().length > 0;
    formConfig.submitWrapper.classList.toggle('is-disable', !hasInput);
  };

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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const prompt = formConfig.input.value.trim();
    if (!prompt) return;

    const promptEncoded = encodeURIComponent(prompt);
    const resource = selectedIntegration
      ? `&create_with_prompt_resource=${encodeURIComponent(selectedIntegration)}`
      : '';
    const query = `?create_with_prompt=${promptEncoded}${resource}`;

    formConfig.hiddenInput.value = query;

    console.log({
      Prompt: prompt,
      Integration: selectedIntegration || '(none)',
      FinalQuery: query,
    });

    window.location.href = `${BASE_URL}${query}`;
  };

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
    formConfig.submit.addEventListener('click', handleFormSubmit);
    formConfig.input.addEventListener('input', updateUIState);
  };

  initEventListeners();
}

function splideBuildInit() {
  const splide = new Splide('#splideBuild', {
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

  document.querySelector('[build-form=next]')?.addEventListener('click', () => splide.go('>'));
}

// Установить .is-active на первый элемент
const firstIntegration = document.querySelector('.build-form__data-wrapper .build-form_radio-integration');
if (firstIntegration) {
  firstIntegration.classList.add('is-active');

  // Активируем радио внутри
  const input = firstIntegration.querySelector('input[type="radio"]');
  if (input) {
    input.checked = true;
    input.dispatchEvent(new Event('change', { bubbles: true })); // чтобы сработал обработчик
  }
}

document.addEventListener('DOMContentLoaded', () => {
  buildFormInit();
  splideBuildInit();

  // Инициализация тултипов
  tippy('[data-tippy-content]', {
    placement: 'bottom',
    arrow: true,
    theme: 'light',
    delay: [0, 0],
    animation: 'fade',
  });
});
