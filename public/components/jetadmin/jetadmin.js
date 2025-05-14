const buildForm = {
  form: document.querySelector('.wf-form-Build-Form'),
  submit: document.getElementById('buildFormSubmit'),
  input: document.getElementById('buildFormInput'),

  radioPromptAdmin: document.getElementById('promptAdmin'),
  radioPromptCRM: document.getElementById('radioPromptCRM'),
  radioPromptPortal: document.getElementById('promptPortal'),
  radioPromptInventory: document.getElementById('promptInventory'),

  radioIntegration: document.querySelectorAll('.build-form_radio-integration'),

  hiddenInput: document.getElementById('buildFormHiddenInput'),
};

const BASE_URL = 'https://app.jetadmin.io/builder/';

let selectedPrompt = '';
let selectedIntegration = '';

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

buildForm.radioIntegration.forEach(radio => {
  radio.addEventListener('change', () => {
    selectedIntegration = radio.dataset.name || '';
    updateHiddenInput();
  });
});

function updateHiddenInput() {
  const prompt = buildForm.input.value.trim();
  if (!buildForm.hiddenInput) return;

  if (selectedIntegration && prompt) {
    const promptEncoded = encodeURIComponent(prompt);
    buildForm.hiddenInput.value = `?Integration=${selectedIntegration}&prompt=${promptEncoded}`;
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
  // window.location.href = `${BASE_URL}${query}`;
});

document.querySelectorAll('.build-form__radio-input').forEach(radio => {
  radio.addEventListener('change', () => {
    document.querySelectorAll('.build-form_radio').forEach(label => {
      label.classList.remove('is-active');
    });
    if (radio.checked) {
      radio.closest('.build-form_radio').classList.add('is-active');
    }
  });
});

document.querySelectorAll('.build-form__radio-input').forEach(radio => {
  radio.addEventListener('change', () => {
    document.querySelectorAll('.build-form_radio-integration').forEach(label => {
      label.classList.remove('is-active');
    });
    if (radio.checked) {
      radio.closest('.build-form_radio-integration').classList.add('is-active');
    }
  });
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


