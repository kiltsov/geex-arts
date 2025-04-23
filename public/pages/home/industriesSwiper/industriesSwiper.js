const swiperComponent = {
    swiper: document.getElementById('swiperIndustries'),
    buttonPrev: document.getElementById('industrySliderButtonPrev'),
    buttonNext: document.getElementById('industrySliderButtonNext'),
}


const swiperIndustriesInit = new Swiper(swiperComponent.swiper, {
    speed: 400,
    spaceBetween: 0,
    slidesPerView: 1,
    loop: true,
    navigation: {
        nextEl: swiperComponent.buttonNext,
        prevEl: swiperComponent.buttonPrev,
    },
  });

