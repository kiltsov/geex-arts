
import { isMobile } from '../../global/global.js';

import { headerScrollAnimation } from '../../components/header/header.js';
import { headerMoveIntoViewAnimation } from '../../components/header/header.js';

import { pageTransitionAnimation } from '../../components/transition/transition.js';
import { cursorViewCaseAnimation } from '../../components/cursor/cursor.js';
import { textFadeIntoAnimation } from '../../components/text-animation/textAnimation.js';

import { swiperIndustriesInit } from './industriesSwiper/industriesSwiper.js';
import { videoPlayOnHover, videoAutoplay } from '../../components/video-player/video-player.js';


const homePage = {
  heroModel: {
    grid: document.querySelector('.model-grid'),
    circles: document.querySelectorAll('.hero-model-cirle'),
    pin: document.querySelectorAll('.model-pin'),
  },
  videos: document.querySelectorAll('.work-card-video_hover'),
  cards: document.querySelectorAll('.work-card'),
};

function homeHeroModelAnimation() {
  const { circles, pin } = homePage.heroModel;

  const tl = gsap.timeline({ delay: 0.3 });

  gsap.set(circles, {
    opacity: 0,
    yPercent: 100,
  });

  gsap.set(pin, {
    opacity: 0,
    yPercent: 100,
  });

  tl.to(circles, {
    opacity: 1,
    yPercent: 0,
    duration: 1,
    stagger: 0.05,
  });

  tl.to(pin, {
    opacity: 1,
    yPercent: 0,
    duration: 1,
    stagger: 0.01,
  });
}

// Находим нужные элементы
const videoWrapper = document.querySelector('.services-video__wrapper');
const modalIndustries = document.querySelector('.modal-industries');
const modalCloseButton = document.querySelector('.modal-industries__close-button');

// Функция для открытия модального окна
function openModal() {
  modalIndustries.classList.add('is-active'); // Предполагаем, что класс is-active показывает модалку
}

// Функция для закрытия модального окна
function closeModal() {
  modalIndustries.classList.remove('is-active');
}

// Вешаем обработчики событий
if (videoWrapper && modalIndustries && modalCloseButton) {
  videoWrapper.addEventListener('click', openModal);
  modalCloseButton.addEventListener('click', closeModal);
}

// Video hover effect
let isHovering = false;
let targetX = 0;
let targetY = 0;

videoWrapper.addEventListener('mouseenter', () => {
  isHovering = true;
});

videoWrapper.addEventListener('mouseleave', () => {
  isHovering = false;
  videoWrapper.style.transform = `translate(0px, 0px)`; // Сбросить позицию
});

videoWrapper.addEventListener('mousemove', (e) => {
  if (!isHovering) return;

  const rect = videoWrapper.getBoundingClientRect();
  const offsetX = e.clientX - rect.left; // Позиция мыши внутри элемента
  const offsetY = e.clientY - rect.top;

  // Нормализуем координаты в диапазон [-1, 1]
  const xPercent = (offsetX / rect.width) * 2 - 1;
  const yPercent = (offsetY / rect.height) * 2 - 1;

  // Управляем силой движения
  const moveRange = 20; // Максимальное смещение в пикселях

  targetX = xPercent * moveRange;
  targetY = yPercent * moveRange;

  videoWrapper.style.transform = `translate(${targetX}px, ${targetY}px)`;
});

//
//
//

// document.addEventListener('DOMContentLoaded', function () {
//   swiperIndustriesInit();
// });

// window.addEventListener('load', function () {
//   swiperIndustriesInit();
// });

pageTransitionAnimation(() => {
  textFadeIntoAnimation();
  homeHeroModelAnimation();
  headerMoveIntoViewAnimation();
  headerScrollAnimation();
});

window.addEventListener('load', function () {
  swiperIndustriesInit();
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