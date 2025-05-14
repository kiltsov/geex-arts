const buildForm = {
  form: document.querySelector('.wf-form-Build-Form'),
  submit: document.getElementById('buildFormSubmit'),
  input: document.getElementById('buildFormInput'),

  radioPromptAdmin: document.getElementById('promptAdmin'),
  radioPromptCRM: document.getElementById('radioPromptCRM'),
  radioPromptPortal: document.getElementById('promptPortal'),
  radioPromptInventory: document.getElementById('promptInventory'),

  radioData: document.querySelectorAll('.build-form_data-radio'),

  hiddenInput: document.getElementById('buildFormHiddenInput'),
};

const BASE_URL = 'https://app.jetadmin.io/builder/new_app_34/prod/assistant/create';

let selectedPrompt = '';
let selectedSlug = '';

// Prompts
const prompts = {
  promptAdmin: 'Admin panel on top of my data for managing content',
  radioPromptCRM: 'Custom CRM – Custom CRM on top of my data for managing leads and customer relationships',
  promptPortal: 'Customer Portal – Customer portal on top of my data for secure self-service access',
  promptInventory: 'Dashboard – Dashboard on top of my data for tracking metrics and insights',
};

// Обработчики для первой группы радиокнопок
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

// Обработчик для радиокнопок из CMS (с dynamic id/slug)
buildForm.radioData.forEach(radio => {
  radio.addEventListener('change', () => {
    selectedSlug = radio.dataset.name || ''; // <-- берем из data-name
    updateHiddenInput();
  });
});

function updateHiddenInput() {
  const prompt = buildForm.input.value.trim();
  if (!buildForm.hiddenInput) return; // Защита

  if (selectedSlug && prompt) {
    const promptEncoded = encodeURIComponent(prompt);
    buildForm.hiddenInput.value = `/${selectedSlug}?prompt=${promptEncoded}`;
  } else {
    buildForm.hiddenInput.value = '';
  }
}

// Сабмит формы
// Сабмит формы
buildForm.submit.addEventListener('click', (e) => {
  e.preventDefault();

  const prompt = buildForm.input.value.trim();
  const promptEncoded = encodeURIComponent(prompt);
  const query = `/${selectedSlug}?prompt=${promptEncoded}`;

  // Пишем в скрытый инпут
  buildForm.hiddenInput.value = query;

  console.log('📌 Выбранный slug:', selectedSlug);
  console.log('✏️ Выбранный prompt:', prompt);
  console.log('📎 Финальная query строка:', query);

  // Переход (можно включить при необходимости)
  // window.location.href = `${BASE_URL}${query}`;
});

//
//
//

function swiperBuildInit() {
  const swiperBuild = new Swiper('#swiperBuild', {
    spaceBetween: 8,
    slidesPerView: 5,
    slidesPerGroup: 5,

    // observer: true,
    // observeParents: true,

    // grabCursor: true,
    // a11y: false,
    // allowTouchMove: true,

    loop: true,
    speed: 600,

    navigation: {
      nextEl: '[build-form=next]',
      //   prevEl: '[h-blog-button=prev]',
    },

    // pagination: {
    //   el: '.new-temp-pagination',
    //   clickable: true,
    // },

    // breakpoints: {
    //   992: {
    //     spaceBetween: 0,
    //     slidesPerView: 0,
    //     slidesPerGroup: 3,
    //   },
    //   768: {
    //     spaceBetween: 0,
    //     slidesPerView: 1,
    //     slidesPerGroup: 1,
    //   },
    //   480: {
    //     spaceBetween: 0,
    //     slidesPerView: 1,
    //     slidesPerGroup: 1,
    //   },
    //   0: {
    //     spaceBetween: 0,
    //     slidesPerView: 1,
    //     slidesPerGroup: 1,
    //   },
    // },
  });
}

swiperBuildInit();
