import { isMobile } from '../../global/global.js';

import { headerScrollAnimation } from '../../components/header/header.js';
import { headerMoveIntoViewAnimation } from '../../components/header/header.js';

import { pageTransitionAnimation } from '../../components/transition/transition.js';
import { cursorViewCaseAnimation } from '../../components/cursor/cursor.js';
import { textFadeIntoAnimation } from '../../components/text-animation/textAnimation.js';

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

// ========================================== //
// ================== INIT ================== //
// ========================================== //


window.addEventListener('load', function () {
});

document.addEventListener('DOMContentLoaded', () => {

});

// DESKTOP FUNCTIONS
if (!isMobile() && window.innerWidth > 992) {
}

// MOBILE FUNCTIONS
if (isMobile() && window.innerWidth < 992) {
}
