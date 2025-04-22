export const headerComponent = {
  header: document.getElementById('header'),
};

export function headerScrollAnimation() {
  if (!headerComponent.header) return;

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
            gsap.to(headerComponent.header, { yPercent: -120, duration: 0.5 });
          } else {
            // Скролл вверх
            gsap.to(headerComponent.header, { yPercent: 0, duration: 0.5 });
          }
        }
      },
    },
  });
}

export function headerMoveIntoViewAnimation() {
  if (!headerComponent.header) return;

  // gsap.set(headerComponent.header, {
  //   yPercent: -100,
  // });

  gsap.to(headerComponent.header, {
    yPercent: 0,
    duration: 2,
  });
}
