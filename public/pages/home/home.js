import { headerScrollAnimation } from '../../components/header/header.js';
import { pageTransitionAnimation } from '../../components/transition/transition.js';

headerScrollAnimation();
pageTransitionAnimation();

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
