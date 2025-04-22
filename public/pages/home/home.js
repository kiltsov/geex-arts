import { headerScrollAnimation } from '../../components/header/header.js';
import { pageTransitionAnimation } from '../../components/transition/transition.js';
import { cursorViewCaseAnimation } from '../../components/cursor/cursor.js';
import { textAnimationFadeInto } from '../../components/text-animation/textAnimation.js';

const homePage = {
  videos: document.querySelectorAll('.work-card-video_hover'),
  cards: document.querySelectorAll('.work-card'),
};

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