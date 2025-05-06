import { isMobile } from '../../global/global.js';

import { headerScrollAnimation } from '../../components/header/header.js';
import { headerMoveIntoViewAnimation } from '../../components/header/header.js';

import { pageTransitionAnimation } from '../../components/transition/transition.js';
import { cursorViewCaseAnimation } from '../../components/cursor/cursor.js';
import { textFadeIntoAnimation } from '../../components/text-animation/textAnimation.js';

import { videoPlayOnHover, videoAutoplay } from '../../components/video-player/video-player.js';

const worksPage = {
  heroModel: {
    bigImage: document.querySelector('.works-hero-model__image-main'),
    circles: document.querySelectorAll('.works-hero-model__grid-image'),
  },
  videos: document.querySelectorAll('.work-card-video_hover'),
  cards: document.querySelectorAll('.work-card'),
};

function worksPageHeroModelAnimation() {
  const { circles, bigImage } = worksPage.heroModel;

  const tl = gsap.timeline({ delay: 0.3 });

  gsap.set(circles, {
    opacity: 0,
    yPercent: 100,
  });

  gsap.set(bigImage, {
    opacity: 0,
    yPercent: 100,
  });

  tl.to(circles, {
    opacity: 1,
    yPercent: 0,
    duration: 1,
    stagger: 0.05,
  });

  tl.to(bigImage, {
    opacity: 1,
    yPercent: 0,
    duration: 1,
  });
}

function worksFilters() {
  // Получаем все вкладки с классом 'works-tab-wrap' (категории)
  const categories = document.querySelectorAll('.work-filter-radio');

  categories.forEach((category) => {
    // Получаем уникальный идентификатор для каждой категории
    const categoryID = category.getAttribute('data-category-id');

    // Считаем количество работ, относящихся к данной категории
    const worksInCategory = document.querySelectorAll(`.works-filter__item[data-category-id="${categoryID}"]`).length;

    // Вставляем число работ в элемент-счетчик рядом с названием категории
    const counterElement = category.querySelector('.filter-count');
    if (counterElement) {
      counterElement.textContent = worksInCategory;
    }

    // Если количество работ равно 0, скрываем категорию
    if (worksInCategory === 0) {
      category.style.display = 'none'; // Скрываем категорию
    }
  });
}

// ========================================== //
// ================== INIT ================== //
// ========================================== //

pageTransitionAnimation(() => {
  textFadeIntoAnimation();
  worksPageHeroModelAnimation();
  headerMoveIntoViewAnimation();
  headerScrollAnimation();
});

window.addEventListener('load', function () {});

document.addEventListener('DOMContentLoaded', () => {
  // worksFilters();
});

// DESKTOP FUNCTIONS
if (!isMobile() && window.innerWidth > 992) {
}

// MOBILE FUNCTIONS
if (isMobile() && window.innerWidth < 992) {
}
