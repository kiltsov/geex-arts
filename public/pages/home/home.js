import { headerScrollAnimation } from '../../components/header/header.js';
import { pageTransitionAnimation } from '../../components/transition/transition.js';
import { cursorViewCaseAnimation } from '../../components/cursor/cursor.js';

headerScrollAnimation();
pageTransitionAnimation();
cursorViewCaseAnimation();

document.addEventListener('DOMContentLoaded', function () {
  const videos = document.querySelectorAll('.works-cards-video_hover');

  videos.forEach((video) => {
    video.addEventListener('mouseenter', () => {
      video.play();
    });

    video.addEventListener('mouseleave', () => {
      video.pause();
    });
  });
});
