import { headerScrollAnimation } from '../../components/header/header.js';
import { pageTransitionAnimation } from '../../components/transition/transition.js';
import { cursorViewCaseAnimation } from '../../components/cursor/cursor.js';

headerScrollAnimation();
pageTransitionAnimation();
cursorViewCaseAnimation();

const homePage = {
  videos: document.querySelectorAll('.works-cards-video'),
  cards: document.querySelectorAll('.works-card'),
};

document.addEventListener('DOMContentLoaded', function () {
  homePage.cards.forEach((card) => {
    const video = card.querySelector('.works-cards-video');
    if (!video) return; // вдруг в карточке нет видео

    card.addEventListener('mouseenter', () => {
      video.play();
    });

    card.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0; // опционально: сбросить видео в начало при выходе
    });
  });
});
