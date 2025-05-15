const wrapper = document.getElementById('templateWrapper');
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

let currentPage = 'homePage';
const itemSlug = '';
let body = document.querySelector(`[body-template=${itemSlug}]`);

// Config
const pageLayouts = {
  homePage: ['sectionMainSlider', 'sectionThumbSlider', 'sectionGrid', 'sectionTemplateFeatures'],
  productPage: ['sectionBigLanding', 'sectionTemplateVideo', 'sectionTemplateDynamics', 'sectionSmallLanding'],
  landingPage: ['sectionMainSlider', 'sectionTemplateFeatures', 'sectionTemplateVideo', 'sectionGrid'],
};

function setLayout(layoutName) {
  if (!pageLayouts[layoutName]) {
    console.error(`Layout "${layoutName}" not found`);
    return;
  }

  while (wrapper.firstChild) {
    wrapper.removeChild(wrapper.firstChild);
  }

  pageLayouts[layoutName].forEach((sectionKey) => {
    if (template[sectionKey]) {
      wrapper.appendChild(template[sectionKey]);
    } else {
      console.warn(`Section "${sectionKey}" not found in template`);
    }
  });
}

if (itemSlug == 'Bazar') {
  currentPage == 'productPage';
  console.log(`Current layout is ${currentPage}`);
} else {
  currentPage = 'homePage';
  console.log(`Current layout is default - ${currentPage}`);
}

function getCurrentPage() {
  const path = window.location.pathname;
  if (path.includes('/product/')) return 'productPage';
  if (path.includes('/landing/')) return 'landingPage';
  return 'homePage';
}

const defaultOrder = Object.keys(template);

// Устанавливаем нужный layout
setLayout(currentPage);
