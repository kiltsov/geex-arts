import { headerScrollAnimation } from '../../components/header/header.js';
import { pageTransitionAnimation } from '../../components/transition/transition.js';
import { cursorViewCaseAnimation } from '../../components/cursor/cursor.js';

headerScrollAnimation();
pageTransitionAnimation();
cursorViewCaseAnimation();

const homePage = {
  videos: document.querySelectorAll('.works-cards-video_hover'),
};

document.addEventListener('DOMContentLoaded', function () {
  homePage.videos.forEach((video) => {
    video.addEventListener('mouseenter', () => {
      video.play();
    });

    video.addEventListener('mouseleave', () => {
      video.pause();
    });
  });
});
