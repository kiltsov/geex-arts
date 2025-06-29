const industrySliderViewMap = [1, 3, 2, 3, 3]; // по порядку слайдеров на странице

const industrySliderComponent = {
  root: '.industry-slider',
  swiperEl: '.swiper',
  buttonContainer: '.industry-slider__buttons',
  buttonTrack: '.industry-slider__button-track',
  buttons: '.industry-slider__button',
  nextEl: '[data-next]',
  prevEl: '[data-prev]',
};

function initIndustrySlider(sliderRoot, slidesPerView = 1) {
  const swiperEl = sliderRoot.matches(industrySliderComponent.swiperEl)
    ? sliderRoot
    : sliderRoot.querySelector(industrySliderComponent.swiperEl);

  if (!(swiperEl instanceof Element)) {
    console.warn('Элемент не найден или невалиден:', swiperEl, 'в блоке:', sliderRoot);
    return;
  }

  const slides = swiperEl.querySelectorAll('.swiper-slide');
  if (slides.length === 0) {
    console.warn('Пропущен инициализация: нет слайдов в', swiperEl);
    return;
  }

  if (swiperEl.classList.contains('swiper-initialized')) {
    console.warn('Уже инициализирован:', swiperEl);
    return;
  }

  const buttonContainer = sliderRoot.querySelector(industrySliderComponent.buttonContainer);
  const buttonTrack = sliderRoot.querySelector(industrySliderComponent.buttonTrack);
  const buttons = sliderRoot.querySelectorAll(industrySliderComponent.buttons);
  const nextEl = sliderRoot.querySelector(industrySliderComponent.nextEl);
  const prevEl = sliderRoot.querySelector(industrySliderComponent.prevEl);

  // console.log('swiperEl:', swiperEl);
  // console.log('type:', swiperEl instanceof Element); // должен быть true

  new Swiper(swiperEl, {
    speed: 700,
    spaceBetween: 12,
    slidesPerView,
    loop: true,
    navigation: {
      nextEl,
      prevEl,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      992: {
        slidesPerView: slidesPerView, 
      },
    },
  });

  // Движение кнопок за курсором
  if (buttonContainer && buttonTrack) {
    buttonContainer.addEventListener('mousemove', (e) => {
      const rect = buttonContainer.getBoundingClientRect();
      const offsetY = e.clientY - rect.top;
      const trackHeight = buttonTrack.offsetHeight;
      const containerHeight = rect.height;

      let translateY = offsetY - trackHeight / 2;
      translateY = Math.max(0, Math.min(translateY, containerHeight - trackHeight));

      buttonTrack.style.transform = `translateY(${translateY}px)`;
    });

    // Анимация при наведении
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
}

function swiperIndustriesInit() {
  const sliders = document.querySelectorAll(industrySliderComponent.root);

  sliders.forEach((slider, index) => {
    const slidesPerView = industrySliderViewMap[index] || 1;
    initIndustrySlider(slider, slidesPerView);
  });
}

export { swiperIndustriesInit };