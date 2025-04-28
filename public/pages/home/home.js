import { headerScrollAnimation } from '../../components/header/header.js';
import { headerMoveIntoViewAnimation } from '../../components/header/header.js';

import { pageTransitionAnimation } from '../../components/transition/transition.js';
import { cursorViewCaseAnimation } from '../../components/cursor/cursor.js';
import { textFadeIntoAnimation } from '../../components/text-animation/textAnimation.js';

import { swiperIndustriesInit } from './industriesSwiper/industriesSwiper.js';
import { videoPlayOnHover } from '../../components/video-player/video-player.js';


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

document.addEventListener('DOMContentLoaded', function () {
  const videos = document.querySelectorAll('.work-card-video_hover');

  videos.forEach((video) => {
    video.addEventListener('mouseenter', () => {
      video.play();
    });

    video.addEventListener('mouseleave', () => {
      video.pause();
    });
  });

  swiperIndustriesInit();
});

pageTransitionAnimation(() => {
  textFadeIntoAnimation();
  homeHeroModelAnimation();
  headerMoveIntoViewAnimation();
  headerScrollAnimation();
});

cursorViewCaseAnimation();
videoPlayOnHover();