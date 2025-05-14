const buildForm = {
  form: document.querySelector('.wf-form-Build-Form'),
  submit: document.getElementById('buildFormSubmit'),
  input: document.getElementById('buildFormInput'),

  radioPromptAdmin: document.getElementById('promptAdmin'),
  radioPromptCRM: document.getElementById('radioPromptCRM'),
  radioPromptPortal: document.getElementById('promptPortal'),
  radioPromptInventory: document.getElementById('promptInventory'),

  radioData: document.querySelectorAll('.build-form_data-radio'),
};

const BASE_URL = 'https://app.jetadmin.io/builder/new_app_34/prod/assistant/create';

let selectedPrompt = '';
let selectedSlug = '';

// Промпты (можно заменить на любые строки)
const prompts = {
  promptAdmin: 'Create an admin panel',
  radioPromptCRM: 'Build a CRM dashboard',
  promptPortal: 'Build a client portal',
  promptInventory: 'Create an inventory tracker',
};

// Обработчики для первой группы радиокнопок
[
  buildForm.radioPromptAdmin,
  buildForm.radioPromptCRM,
  buildForm.radioPromptPortal,
  buildForm.radioPromptInventory,
].forEach(radio => {
  if (radio) {
    radio.addEventListener('change', () => {
      selectedPrompt = prompts[radio.id] || '';
      buildForm.input.value = selectedPrompt;
    });
  }
});

// Обработчик для радиокнопок из CMS (с dynamic id/slug)
buildForm.radioData.forEach(radio => {
  radio.addEventListener('change', () => {
    selectedSlug = radio.id; // id = slug
  });
});

// Сабмит формы
buildForm.submit.addEventListener('click', (e) => {
  e.preventDefault();

  const promptEncoded = encodeURIComponent(buildForm.input.value.trim());
  const url = `${BASE_URL}/${selectedSlug}?prompt=${promptEncoded}`;

  console.log('Redirecting to:', url);
  window.location.href = url;
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



