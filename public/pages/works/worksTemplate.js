import { isMobile } from '../../global/global.js';

import { headerScrollAnimation } from '../../components/header/header.js';
import { headerMoveIntoViewAnimation } from '../../components/header/header.js';

import { pageTransitionAnimation } from '../../components/transition/transition.js';
import { cursorViewCaseAnimation } from '../../components/cursor/cursor.js';
import { textFadeIntoAnimation } from '../../components/text-animation/textAnimation.js';

import { videoPlayOnHover, videoAutoplay } from '../../components/video-player/video-player.js';

// Swiper Template Swiper Big
function swiperTsbInit() {
  const sliderGroups = document.querySelectorAll('.tsb__component');

  sliderGroups.forEach((groupEl) => {
    const swiperEl = groupEl.querySelector('.swiper-tsb');
    if (!swiperEl) return;

    const swiperTsb = new Swiper(swiperEl, {
      spaceBetween: 32,
      slidesPerView: 1,
      loop: false,
      speed: 600,

      navigation: {
        nextEl: '[tsb-button=next]',
        prevEl: '[tsb-button=prev]',
      },

      on: {
        init(swiper) {
          updatePreviewButtons(swiper);
        },
        slideChange(swiper) {
          updatePreviewButtons(swiper);
        },
      },
    });

    function updatePreviewButtons(swiperInstance) {
      const slides = swiperInstance.slides;
      const currentIndex = swiperInstance.realIndex;

      if (!slides || slides.length === 0) return;

      const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
      const nextIndex = (currentIndex + 1) % slides.length;

      const prevSlide = slides[prevIndex];
      const nextSlide = slides[nextIndex];

      const prevSlideImg = prevSlide?.querySelector?.('.tsb-card img');
      const nextSlideImg = nextSlide?.querySelector?.('.tsb-card img');

      const prevButton = groupEl.querySelector('[tsb-button=prev]');
      const nextButton = groupEl.querySelector('[tsb-button=next]');
      const prevButtonImg = prevButton?.querySelector?.('img');
      const nextButtonImg = nextButton?.querySelector?.('img');

      // Обновляем превью
      if (prevSlideImg && prevButtonImg) {
        prevButtonImg.src = prevSlideImg.src;
      }
      if (nextSlideImg && nextButtonImg) {
        nextButtonImg.src = nextSlideImg.src;
      }

      // Скрытие/показ кнопок в зависимости от текущего слайда
      // Скрытие/показ кнопок в зависимости от текущего слайда
      if (swiperInstance.isBeginning) {
        prevButton?.classList.add('is-hidden');
      } else {
        prevButton?.classList.remove('is-hidden');
      }

      if (swiperInstance.isEnd) {
        nextButton?.classList.add('is-hidden');
      } else {
        nextButton?.classList.remove('is-hidden');
      }
    }
  });
}

function swiperThumbsInit() {
  const sliderGroups = document.querySelectorAll('.thumb-slider-element');

  sliderGroups.forEach((groupEl) => {
    const galleryEl = groupEl.querySelector('.thumb-gallery');
    const swiperEl = groupEl.querySelector('.thumb-swiper');

    if (!galleryEl || !swiperEl) {
      console.warn('One of the swiper elements is missing in group:', groupEl);
      return;
    }

    const galleryThumbs = new Swiper(galleryEl, {
      spaceBetween: 8,
      slidesPerView: 'auto',
      watchSlidesProgress: true,
      centeredSlides: false,
      grabCursor: true,
      allowTouchMove: true,
      a11y: false,
    });

    new Swiper(swiperEl, {
      spaceBetween: 18,
      slidesPerView: 1.1,
      speed: 600,
      loop: false,

      thumbs: {
        swiper: galleryThumbs,
      },
    });
  });
}

// ========================================== //
// ================== INIT ================== //
// ========================================== //

pageTransitionAnimation(() => {
  textFadeIntoAnimation();
  headerMoveIntoViewAnimation();
  headerScrollAnimation();
}, 0.5);

window.addEventListener('load', function () {
  // swiperThumbsInit();
});

document.addEventListener('DOMContentLoaded', () => {
  swiperTsbInit();
  swiperThumbsInit();
});

// DESKTOP FUNCTIONS
if (!isMobile() && window.innerWidth > 992) {
  videoPlayOnHover();
  cursorViewCaseAnimation();
}

// MOBILE FUNCTIONS
if (isMobile() && window.innerWidth < 992) {
  videoAutoplay();
}
