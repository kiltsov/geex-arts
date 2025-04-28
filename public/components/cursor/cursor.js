const cursorViewCaseComponent = {
  cursorWrappers: document.querySelectorAll('.cursor-wrapper'),
  cursors: document.querySelectorAll('.cursor'),
};

export function cursorViewCaseAnimation() {
  if (!cursorViewCaseComponent.cursorWrappers.length) return;
z
  cursorViewCaseComponent.cursorWrappers.forEach((wrapper) => {
    const cursor = wrapper.querySelector('.cursor');
    if (!cursor) return;

    const xTo = gsap.quickTo(cursor, 'x', {
      duration: 0.3,
      ease: 'power3.out',
    });

    const yTo = gsap.quickTo(cursor, 'y', {
      duration: 0.3,
      ease: 'power3.out',
    });

    let mouseX = 0;
    let mouseY = 0;
    let isAnimating = false;

    const animateCursor = () => {
      xTo(mouseX);
      yTo(mouseY);
      isAnimating = false;
    };

    wrapper.addEventListener('mousemove', (e) => {
      const rect = wrapper.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;

      if (!isAnimating) {
        isAnimating = true;
        requestAnimationFrame(animateCursor);
      }
    });

    wrapper.addEventListener('mouseenter', () => {
      gsap.to(cursor, {
        autoAlpha: 1,
        duration: 0.3,
        ease: 'power3.out',
      });
    });

    wrapper.addEventListener('mouseleave', () => {
      gsap.to(cursor, {
        autoAlpha: 0,
        duration: 0.3,
        ease: 'power3.out',
      });
    });

    // Изначально скрываем курсор
    gsap.set(cursor, { autoAlpha: 0 });
  });
}
