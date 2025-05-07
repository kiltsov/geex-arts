import { isMobile } from '../../global/global.js';

import { headerScrollAnimation } from '../../components/header/header.js';
import { headerMoveIntoViewAnimation } from '../../components/header/header.js';

import { pageTransitionAnimation } from '../../components/transition/transition.js';
import { cursorViewCaseAnimation } from '../../components/cursor/cursor.js';
import { textFadeIntoAnimation } from '../../components/text-animation/textAnimation.js';

import { videoPlayOnHover, videoAutoplay } from '../../components/video-player/video-player.js';

// ========================================== //
// ================== INIT ================== //
// ========================================== //

pageTransitionAnimation(() => {
  textFadeIntoAnimation();
  headerMoveIntoViewAnimation();
  headerScrollAnimation();
}, 0.5);

window.addEventListener('load', function () {});

document.addEventListener('DOMContentLoaded', () => {

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
