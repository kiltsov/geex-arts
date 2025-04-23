const industrySliderConfig = {
    'sliderIndustries1': { slidesPerView: 1 },
    'sliderIndustries2': { slidesPerView: 2 },
  'sliderIndustries3': { slidesPerView: 3 },
  'sliderIndustries4': { slidesPerView: 4 },
  'sliderIndustries5': { slidesPerView: 5 },
};

function initIndustrySlider(sliderRoot, config = {}) {
    const swiperEl = sliderRoot.querySelector('.swiper');
    const buttonNext = sliderRoot.querySelector('[data-next]');
    const buttonPrev = sliderRoot.querySelector('[data-prev]');
    const buttonContainer = sliderRoot.querySelector('.industry-slider__buttons');
    const buttonTrack = sliderRoot.querySelector('.industry-slider__button-track');
    const buttons = sliderRoot.querySelectorAll('.industry-slider__button');
  
    const slidesPerView = config.slidesPerView || 1;
  
    new Swiper(swiperEl, {
      speed: 700,
      spaceBetween: 0,
      slidesPerView: slidesPerView,
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
    sliders.forEach((slider) => {
      const sliderId = slider.id;
      const config = industrySliderConfig[sliderId] || { slidesPerView: 1 };
      initIndustrySlider(slider, config);
    });
  }

export { swiperIndustriesInit };
