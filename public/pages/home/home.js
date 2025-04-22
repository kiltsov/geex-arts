import { headerScrollAnimation } from '../../components/header/header.js';
import { pageTransitionAnimation } from '../../components/transition/transition.js';
import { cursorViewCaseAnimation } from '../../components/cursor/cursor.js';
import { textFadeIntoAnimation } from '../../components/text-animation/textAnimation.js';

const homePage = {
  heroModel: {
    grid: document.querySelector('.model-grid'),
    circles: document.querySelectorAll('.hero-model-cirle'),
    pin: document.querySelectorAll('.model-pin'),
  },
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

function homeHeroModelAnimation() {
    const { circles, pin } = homePage.heroModel;

    const tl = gsap.timeline({ delay: 0.3 });

    gsap.set(circles, {
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
};

pageTransitionAnimation(() => {
    textFadeIntoAnimation();
    homeHeroModelAnimation()
});

headerScrollAnimation();
cursorViewCaseAnimation();