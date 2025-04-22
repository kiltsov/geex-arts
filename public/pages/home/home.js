import { headerScrollAnimation } from '../../components/header/header.js';
import { pageTransitionAnimation } from '../../components/transition/transition.js';
import { cursorViewCaseAnimation } from '../../components/cursor/cursor.js';

headerScrollAnimation();
pageTransitionAnimation();
cursorViewCaseAnimation();

const homePage = {
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

document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('[split-text="effect-fade-into"]');

  elements.forEach((el) => {
    // Разбиваем текст на буквы
    const split = new SplitText(el, { type: 'chars', charsClass: 'split-char' });

    // Устанавливаем начальное состояние
    gsap.set(split.chars, {
      opacity: 0,
      filter: 'blur(16px)',
      y: 20,
    });

    // Создаем анимацию с триггером при появлении в вьюпорте
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const tl = gsap.timeline();

            tl.to(split.chars, {
              opacity: 1,
              filter: 'blur(0px)',
              y: 0,
              duration: 1,
              ease: 'power3.out',
              stagger: 0.03,
            });

            observer.unobserve(el); // Отписка после первого запуска
          }
        });
      },
      {
        threshold: 0.1, // Срабатывание когда хотя бы 10% видно
      }
    );

    observer.observe(el);
  });
});
