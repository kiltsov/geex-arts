const industrySliderViewMap = [1, 2, 3, 4, 1]; // По порядку слайдеров
function initIndustrySlider(sliderRoot, slidesPerView = 1) {
    const swiperEl = sliderRoot.querySelector('.swiper');
    const buttonContainer = sliderRoot.querySelector('.industry-slider__buttons');
    const buttonTrack = sliderRoot.querySelector('.industry-slider__button-track');
    const buttons = sliderRoot.querySelectorAll('.industry-slider__button');
  
    if (!swiperEl) return;
  
    const swiper = new Swiper(swiperEl, {
      speed: 700,
      spaceBetween: 0,
      slidesPerView,
      loop: false,
      navigation: {
        nextEl: sliderRoot.querySelector('[data-next]'),
        prevEl: sliderRoot.querySelector('[data-prev]'),
      },
    });
  
    // Безопасно навешиваем hover-анимацию
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
    const sliders = document.querySelectorAll('.industry-slider');
  
    sliders.forEach((slider, index) => {
      const slidesPerView = industrySliderViewMap[index] || 1;
      initIndustrySlider(slider, slidesPerView);
    });
  }

export { swiperIndustriesInit };
