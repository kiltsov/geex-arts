import { hoverElements } from '../../global/global.js';

function videoPlayOnHover() {
  hoverElements.forEach(card => {
    const video = card.querySelector('.video-player');
    if (!video) return;

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

function videoAutoplay() {
  hoverElements.forEach(card => {
    const video = card.querySelector('.video-player');
    if (!video) return;

    video.setAttribute('autoplay', ''); // <--- Динамически добавляем autoplay
    video.play().catch(err => {
      console.warn('Автозапуск видео не удался на мобильном устройстве:', err);
    });
  });
}

export { videoPlayOnHover, videoAutoplay };