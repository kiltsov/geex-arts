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
  sectionWorks: {
    items: document.querySelectorAll('.works__item'),
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
  const items = document.querySelectorAll(".works__item");
  const filters = document.querySelectorAll("[data-category-id]"); // все фильтры

  filters.forEach(filter => {
    const category = filter.getAttribute("data-category-id")?.trim().toLowerCase();
    let count = 0;

    items.forEach(item => {
      const tags = item.querySelectorAll("[data-category-id]");
      let match = false;

      tags.forEach(tag => {
        const tagCategory = tag.getAttribute("data-category-id")?.trim().toLowerCase();
        if (tagCategory === category) {
          match = true;
        }
      });

      if (match) {
        count++;
      }
    });

    const countSpan = filter.querySelector(".filter-count");
    if (countSpan) {
      countSpan.textContent = `${count}`;
    }
  });
}

function worksListItemsAnimation() {
  const items = worksPage.sectionWorks.items;

  gsap.set(items, { y: 300, autoAlpha: 0 });

  gsap.to(items, {
    y: 0,
    autoAlpha: 1,
    stagger: {
      each: 0.09,
      from: "start",
    },
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".works__list", // или другой обёртке, содержащей .works__item
      start: "top 80%",        // когда верх обёртки попадает в 80% окна
      toggleActions: "play none none none",
    },
  });
}

// ========================================== //
// ================== INIT ================== //
// ========================================== //

pageTransitionAnimation(() => {
  textFadeIntoAnimation();
  // worksPageHeroModelAnimation();
  // headerMoveIntoViewAnimation();
  headerScrollAnimation();
}, 0.5);

window.addEventListener('load', function () {});

document.addEventListener('DOMContentLoaded', () => {
  worksFilters();
  worksListItemsAnimation();
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
