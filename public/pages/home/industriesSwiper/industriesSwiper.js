function initIndustrySlider(sliderRoot) {
  const swiperEl = sliderRoot.querySelector('.swiper');
  const buttonNext = sliderRoot.querySelector('[data-next]');
  const buttonPrev = sliderRoot.querySelector('[data-prev]');
  const buttonContainer = sliderRoot.querySelector('.industry-slider__buttons');
  const buttonTrack = sliderRoot.querySelector('.industry-slider__button-track');
  const buttons = sliderRoot.querySelectorAll('.industry-slider__button');

  // Swiper
  new Swiper(swiperEl, {
    speed: 700,
    spaceBetween: 0,
    slidesPerView: 1,
    loop: true,
    navigation: {
      nextEl: buttonNext,
      prevEl: buttonPrev,
    },
  });

  // Move buttons
  buttonContainer.addEventListener('mousemove', (e) => {
    const rect = buttonContainer.getBoundingClientRect();
    const offsetY = e.clientY - rect.top;

    const trackHeight = buttonTrack.offsetHeight;
    const containerHeight = rect.height;

    let translateY = offsetY - trackHeight / 2;
    translateY = Math.max(0, Math.min(translateY, containerHeight - trackHeight));

    buttonTrack.style.transform = `translateY(${translateY}px)`;
  });

  // Animation in
  buttonContainer.addEventListener('mouseenter', () => {
    gsap.fromTo(
      buttons,
      {
        y: (i) => (i % 2 === 0 ? -100 : 100),
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

function swiperIndustriesInit() {
  const sliders = document.querySelectorAll('.industry-slider');
  sliders.forEach(initIndustrySlider);
}

export { swiperIndustriesInit };
