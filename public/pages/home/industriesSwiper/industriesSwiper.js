const swiperComponent = {
  swiper: document.getElementById('swiperIndustries'),
  buttonPrev: document.getElementById('industrySliderButtonPrev'),
  buttonNext: document.getElementById('industrySliderButtonNext'),
  buttonContainer: document.querySelector('.industry-slider__buttons'),
  buttonTrack: document.querySelector('.industry-slider__button-track'),
  buttons: document.querySelectorAll('.industry-slider__button'),
};

const buttonContainer = swiperComponent.buttonContainer;
const buttonTrack = swiperComponent.buttonTrack;
const buttons = swiperComponent.buttons;

function swiperIndustriesInit() {
  const swiperIndustries = new Swiper(swiperComponent.swiper, {
    speed: 700,
    spaceBetween: 0,
    slidesPerView: 1,
    loop: true,
    navigation: {
      nextEl: swiperComponent.buttonNext,
      prevEl: swiperComponent.buttonPrev,
    },
  });

  buttonContainer.addEventListener('mousemove', (e) => {
    const rect = buttonContainer.getBoundingClientRect();
    const offsetY = e.clientY - rect.top;
  
    // Центрируем трек по курсору
    const trackHeight = buttonTrack.offsetHeight;
    const containerHeight = rect.height;
  
    // Гарантируем, что трек не выйдет за пределы контейнера
    let translateY = offsetY - trackHeight / 2;
    translateY = Math.max(0, Math.min(translateY, containerHeight - trackHeight));
  
    buttonTrack.style.transform = `translateY(${translateY}px)`;
  });

  buttonContainer.addEventListener('mouseenter', () => {
    gsap.fromTo(
      buttons,
      {
        y: (i) => (i % 2 === 0 ? -100 : 100), // разные направления
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out',
      }
    );
  });
}

export { swiperIndustriesInit };
