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
  const items = document.querySelectorAll("[fs-cmsfilter-element='list'] > *");
  const checkboxes = document.querySelectorAll("[fs-cmsfilter-field='services'] input[type='checkbox']");

  checkboxes.forEach(checkbox => {
    const value = checkbox.value.trim().toLowerCase();
    let count = 0;

    items.forEach(item => {
      const field = item.querySelector("[fs-cmsfilter-field='services']");
      const text = field?.textContent?.toLowerCase() || "";

      if (text.includes(value)) {
        count++;
      }
    });

    const countSpan = checkbox.closest("label").querySelector(".filter-count");
    if (countSpan) {
      countSpan.textContent = `(${count})`;
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


window.addEventListener('load', function () {
});

document.addEventListener('DOMContentLoaded', () => {
});

document.addEventListener('fs-cmsfilter:loaded', () => {
  worksFilters();
});

// DESKTOP FUNCTIONS
if (!isMobile() && window.innerWidth > 992) {
}

// MOBILE FUNCTIONS
if (isMobile() && window.innerWidth < 992) {
}
