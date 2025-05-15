const itemSlug = 'test'; // Это может быть динамическим значением
const body = document.querySelector(`[body-template="${itemSlug}"]`);

const wrapper = document.getElementById('templateWrapper');
if (!wrapper) throw new Error('Wrapper element not found');

const template = {
  sectionMainSlider: document.getElementById('sectionMainSlider'),
  sectionTemplateFeatures: document.getElementById('sectionTemplateFeatures'),
  sectionGrid: document.getElementById('sectionGrid'),
  sectionThumbSlider: document.getElementById('sectionThumbSlider'),
  sectionTemplateVideo: document.getElementById('sectionTemplateVideo'),
  sectionBigLanding: document.getElementById('sectionBigLanding'),
  sectionSmallLanding: document.getElementById('sectionSmallLanding'),

  sectionTemplateDynamics: document.getElementById('sectionTemplateDynamics'),
};

// Конфигурация расположения секций
const pageLayouts = {
  homePage: ['sectionMainSlider', 'sectionTemplateFeatures', 'sectionGrid', 'sectionThumbSlider', 'sectionTemplateVideo', 'sectionBigLanding', 'sectionSmallLanding' ],
  productPage: ['sectionSmallLanding', 'sectionBigLanding', 'sectionTemplateVideo', 'sectionThumbSlider', 'sectionGrid', 'sectionTemplateFeatures', 'sectionMainSlider' ],
  landingPage: ['sectionTemplateFeatures', 'sectionGrid', 'sectionThumbSlider', 'sectionTemplateVideo', 'sectionBigLanding', 'sectionSmallLanding', 'sectionMainSlider' ],
};

// Функция для определения текущей страницы
function getCurrentPage(slug) {
  switch(slug) {
    case 'test':
      console.log('Using homePage layout');
      return 'homePage';
    // Добавьте другие случаи по необходимости
    default:
      console.log('Using default homePage layout');
      return 'homePage';
  }
}

// Функция для установки layout
function setLayout(layoutName) {
  if (!pageLayouts[layoutName]) {
    console.error(`Layout "${layoutName}" not found`);
    return;
  }

  // Очищаем wrapper более эффективным способом
  wrapper.innerHTML = '';

  // Добавляем секции в нужном порядке
  pageLayouts[layoutName].forEach(sectionKey => {
    const section = template[sectionKey];
    if (section) {
      wrapper.appendChild(section);
    } else {
      console.warn(`Section "${sectionKey}" not found in template`);
    }
  });
}

// Основная логика
try {
  const currentLayout = getCurrentPage(itemSlug);
  setLayout(currentLayout);
} catch (error) {
  console.error('Failed to set page layout:', error);
  // Можно установить layout по умолчанию в случае ошибки
  setLayout('homePage');
}