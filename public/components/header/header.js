export const headerComponent = {
  header: document.getElementById('header'),
  headerBrand: document.querySelector('.header-brand'),
  navListItems: document.querySelectorAll('.nav-list__item'),
  buttonHeader: document.querySelector('.button-header'),
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

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.to(headerComponent.header, { yPercent: 0, duration: 0.8 })
    .to(headerComponent.headerBrand, { yPercent: 0, duration: 0.6 }, "-=0.5") // стартует чуть раньше
    .to(headerComponent.navListItems, { yPercent: 0, duration: 0.6, stagger: 0.05 }, "-=0.4")
    .to(headerComponent.buttonHeader, { yPercent: 0, duration: 0.6 }, "-=0.4");
}
