const itemSlug = 'test-item'; // Это может быть динамическим значением
const body = document.querySelector(`[body-template="${itemSlug}"]`);

const wrapper = document.getElementById('templateWrapper');
if (!wrapper) throw new Error('Wrapper element not found');

const template = {
  sectionMainSlider: document.getElementById('sectionMainSlider'),
  sectionThumbSlider: document.getElementById('sectionThumbSlider'),
  sectionGrid: document.getElementById('sectionGrid'),
  sectionBigLanding: document.getElementById('sectionBigLanding'),
  sectionSmallLanding: document.getElementById('sectionSmallLanding'),
  sectionTemplateVideo: document.getElementById('sectionTemplateVideo'),
  sectionTemplateFeatures: document.getElementById('sectionTemplateFeatures'),
  sectionTemplateDynamics: document.getElementById('sectionTemplateDynamics'),
};

// Конфигурация расположения секций
const pageLayouts = {
  homePage: ['sectionMainSlider', 'sectionThumbSlider', 'sectionGrid', 'sectionTemplateFeatures'],
  productPage: ['sectionBigLanding', 'sectionTemplateVideo', 'sectionTemplateDynamics', 'sectionSmallLanding'],
  landingPage: ['sectionMainSlider', 'sectionTemplateFeatures', 'sectionTemplateVideo', 'sectionGrid'],
};

// Функция для определения текущей страницы
function getCurrentPage(slug) {
  switch(slug) {
    case 'test-item':
      console.log('Using productPage layout');
      return 'landingPage';
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