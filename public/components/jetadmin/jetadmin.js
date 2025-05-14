function swiperBuildInit() {
  const swiperBuild = new Swiper('#swiperBuild', {
    spaceBetween: 'auto',
    slidesPerView: 5,
    slidesPerGroup: 5,

    observer: true,
    observeParents: true,

    grabCursor: true,
    a11y: false,
    allowTouchMove: true,

    loop: true,
	speed: 600,

    navigation: {
      nextEl: '[build-form=next]',
    //   prevEl: '[h-blog-button=prev]',
    },

    // pagination: {
    //   el: '.new-temp-pagination',
    //   clickable: true,
    // },

    // breakpoints: {
    //   992: {
    //     spaceBetween: 0,
    //     slidesPerView: 0,
    //     slidesPerGroup: 3,
    //   },
    //   768: {
    //     spaceBetween: 0,
    //     slidesPerView: 1,
    //     slidesPerGroup: 1,
    //   },
    //   480: {
    //     spaceBetween: 0,
    //     slidesPerView: 1,
    //     slidesPerGroup: 1,
    //   },
    //   0: {
    //     spaceBetween: 0,
    //     slidesPerView: 1,
    //     slidesPerGroup: 1,
    //   },
    // },
  });
}

swiperBuildInit();