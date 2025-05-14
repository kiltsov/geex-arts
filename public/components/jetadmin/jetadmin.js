function buildFormInit() {
  const buildForm = {
    form: document.querySelector('.wf-form-Build-Form'),
    submit: document.getElementById('buildFormSubmit'),
    input: document.getElementById('buildFormInput'),
    hiddenInput: document.getElementById('buildFormHiddenInput'),

    radioPromptAdmin: document.getElementById('promptAdmin'),
    radioPromptCRM: document.getElementById('radioPromptCRM'),
    radioPromptPortal: document.getElementById('promptPortal'),
    radioPromptInventory: document.getElementById('promptInventory'),

    radioIntegration: document.querySelectorAll('.build-form__radio-input-integ'),
  };

  const BASE_URL = 'https://app.jetadmin.io/builder/';

  let selectedPrompt = '';
  let selectedIntegration = '';
  buildForm.submit.classList.add('is-disable');

  // Prompts
  const prompts = {
    promptAdmin: 'Admin panel on top of my data for managing content',
    radioPromptCRM: 'Custom CRM – Custom CRM on top of my data for managing leads and customer relationships',
    promptPortal: 'Customer Portal – Customer portal on top of my data for secure self-service access',
    promptInventory: 'Dashboard – Dashboard on top of my data for tracking metrics and insights',
  };

  [
    buildForm.radioPromptAdmin,
    buildForm.radioPromptCRM,
    buildForm.radioPromptPortal,
    buildForm.radioPromptInventory,
  ].forEach((radio) => {
    if (radio) {
      radio.addEventListener('change', () => {
        selectedPrompt = prompts[radio.id] || '';
        buildForm.input.value = selectedPrompt;
        updateHiddenInput();
      });
    }
  });

  buildForm.radioIntegration.forEach((radio) => {
    radio.addEventListener('change', () => {
      selectedIntegration = radio.value || '';
      updateHiddenInput();
    });
  });

  function updateHiddenInput() {
    const prompt = buildForm.input.value.trim();
    const submit = buildForm.submit;
    if (!buildForm.hiddenInput) return;

    if (selectedIntegration && prompt) {
      const promptEncoded = encodeURIComponent(prompt);
      buildForm.hiddenInput.value = `?Integration=${selectedIntegration}&prompt=${promptEncoded}`;
      submit.classList.remove('is-disable');
    } else {
      buildForm.hiddenInput.value = '';
    }
  }

  buildForm.submit.addEventListener('click', (e) => {
    e.preventDefault();

    const prompt = buildForm.input.value.trim();
    const promptEncoded = encodeURIComponent(prompt);
    const query = `?Integration=${selectedIntegration}&prompt=${promptEncoded}`;

    buildForm.hiddenInput.value = query;

    console.log('Integration:', selectedIntegration);
    console.log('Prompt:', prompt);
    console.log('Final query:', query);

    // Переход
    window.location.href = `${BASE_URL}${query}`;
  });

  // Обработчик для всех радиокнопок
  document.querySelectorAll('.build-form__radio-input, .build-form__radio-input-integ').forEach((radio) => {
    radio.addEventListener('change', () => {
      const isPrompt = radio.name === 'radioPrompts';
      const isIntegration = radio.name === 'selectedIntegration';

      // Сброс классов активности
      if (isPrompt) {
        document.querySelectorAll('.build-form_radio.is-active').forEach((el) => el.classList.remove('is-active'));
      }

      if (isIntegration) {
        document
          .querySelectorAll('.build-form_radio-integration.is-active')
          .forEach((el) => el.classList.remove('is-active'));
      }

      // Добавление класса активности
      const container = radio.closest('.build-form_radio') || radio.closest('.build-form_radio-integration');
      if (container) {
        container.classList.add('is-active');
      }

      // Обновление значений
      if (isPrompt) {
        selectedPrompt = prompts[radio.value] || '';
        buildForm.input.value = selectedPrompt;
      }

      if (isIntegration) {
        selectedIntegration = radio.value.trim();
      }

      updateHiddenInput();
    });
  });
}

function splideBuildInit() {
  const splide = new Splide('#splideBuild', {
    type: 'loop',
    perPage: 9,
    perMove: 9,
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
        perPage: 5,
        perMove: 5,
      },
    },
  });

  splide.mount();

  document.querySelector('[build-form=next]')?.addEventListener('click', () => splide.go('>'));
}

document.addEventListener('DOMContentLoaded', () => {
  buildFormInit();
  splideBuildInit();
});
