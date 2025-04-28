


function videoPlayOnHover() {
const cards = document.querySelectorAll('.cursor-wrapper');

cards.forEach(card => {
  const video = card.querySelector('.video-player');
  
  card.addEventListener('mouseenter', () => {
    video.play();
  });
  
  card.addEventListener('mouseleave', () => {
    video.pause();
    video.currentTime = 0; // сброс к началу
  });
});
}

export { videoPlayOnHover };