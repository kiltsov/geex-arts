export const headerComponent = {
  header: '.header',
};

export function headerScrollAnimation() {
  //
  let lastScrollY = window.scrollY;
  let hideThreshold = window.innerHeight * 0.05; // 5% от высоты экрана

  gsap.to(headerComponent.header, {
    scrollTrigger: {
      onUpdate: (self) => {
        let direction = self.direction; // 1 = скролл вниз, -1 = скролл вверх
        let currentScrollY = window.scrollY;

        if (currentScrollY > hideThreshold) {
          if (direction === 1) {
            // Скролл вниз
            gsap.to(headerComponent.header, { yPercent: -100, duration: 0.5 });
          } else {
            // Скролл вверх
            gsap.to(headerComponent.header, { yPercent: 0, duration: 0.5 });
          }
        }
      },
    },
  });
}
