import { hoverElements } from '../../global/global.js';

function videoPlayOnHover() {
  hoverElements.forEach(card => {
    const video = card.querySelector('.video-player');
    if (!video) return; // если видео нет — пропустить

    card.addEventListener('mouseenter', async () => {
      try {
        await video.play();
      } catch (err) {
        console.warn('Видео не удалось запустить:', err);
      }
    });

    card.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0;
    });
  });
}

export { videoPlayOnHover };