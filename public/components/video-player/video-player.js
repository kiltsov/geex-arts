const videoHoverElements = document.querySelectorAll('[video-hover]');

function videoPlayOnHover() {
  videoHoverElements.forEach(card => {
    const video = card.querySelector('.video-player');
    if (!video) return;

    // Устанавливаем постер
    const source = video.querySelector('source');
    if (source && source.src) {
      const posterUrl = source.src
        .replace('/upload/', '/upload/so_1/')
        .replace('.mp4', '.jpg');
      video.setAttribute('poster', posterUrl);
    }

    // Ховер-анимация
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
  videoHoverElements.forEach(card => {
    const video = card.querySelector('.video-player');
    if (!video) return;

    video.setAttribute('autoplay', ''); // <--- Динамически добавляем autoplay
    video.play().catch(err => {
      console.warn('Автозапуск видео не удался на мобильном устройстве:', err);
    });
  });
}

export { videoPlayOnHover, videoAutoplay };