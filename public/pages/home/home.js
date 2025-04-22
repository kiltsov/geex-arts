import { headerScrollAnimation } from '../../components/header/header.js';
import { pageTransitionAnimation } from '../../components/transition/transition.js';
import { cursorViewCaseAnimation } from '../../components/cursor/cursor.js';
import { textAnimationFadeInto } from '../../components/text-animation/textAnimation.js';

import textAnimationFadeInto from '../../components/text-animation/textAnimation.js';
const { elementFadeInto } = textAnimationFadeInto;



const homePage = {
  videos: document.querySelectorAll('.work-card-video_hover'),
  cards: document.querySelectorAll('.work-card'),
};

gsap.set(elementFadeInto, {
  opacity: 0,
  filter: 'blur(16px)',
  y: 20,
});

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
});

pageTransitionAnimation(() => {
  textAnimationFadeInto();
});

headerScrollAnimation();
cursorViewCaseAnimation();