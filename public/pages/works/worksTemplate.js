import { isMobile } from '../../global/global.js';

import { headerScrollAnimation } from '../../components/header/header.js';
import { headerMoveIntoViewAnimation } from '../../components/header/header.js';

import { pageTransitionAnimation } from '../../components/transition/transition.js';
import { cursorViewCaseAnimation } from '../../components/cursor/cursor.js';
import { textFadeIntoAnimation } from '../../components/text-animation/textAnimation.js';

import { videoPlayOnHover, videoAutoplay } from '../../components/video-player/video-player.js';

// Swiper Template Swiper Big
function swiperTsbInit() {
  const swiperTsb = new Swiper('.swiper-tsb', {
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

    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    const nextIndex = (currentIndex + 1) % slides.length;

    const prevSlideImg = slides[prevIndex].querySelector('.tsb-card img');
    const nextSlideImg = slides[nextIndex].querySelector('.tsb-card img');

    const prevButtonImg = document.querySelector('[tsb-button=prev] img');
    const nextButtonImg = document.querySelector('[tsb-button=next] img');

    if (prevSlideImg && prevButtonImg) {
      prevButtonImg.src = prevSlideImg.src;
    }
    if (nextSlideImg && nextButtonImg) {
      nextButtonImg.src = nextSlideImg.src;
    }
  }
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
