export const cursorViewCaseComponent = {
  cursor: document.querySelector('.view-case-cursor'),
  cursorWrapper: document.querySelector('.view-case__cursor-wrapper'),
};

export function cursorViewCaseAnimation() {
  if (!cursorViewCaseComponent.cursor || !cursorViewCaseComponent.cursorWrapper) return;
  const { cursor, cursorWrapper } = cursorViewCaseComponent;

  const xTo = gsap.quickTo(cursor, 'x', {
    duration: 0.3,
    ease: 'power3.out',
  });

  const yTo = gsap.quickTo(cursor, 'y', {
    duration: 0.3,
    ease: 'power3.out',
  });

  cursorWrapper.addEventListener('mousemove', (e) => {
    const rect = cursorWrapper.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    xTo(x);
    yTo(y);
  });

  // Плавное появление курсора при входе в враппер
  cursorWrapper.addEventListener('mouseenter', () => {
    gsap.to(cursor, {
      autoAlpha: 1,
      duration: 0.3,
      ease: 'power3.out',
    });
  });

  // Плавное исчезновение курсора при выходе из враппера
  cursorWrapper.addEventListener('mouseleave', () => {
    gsap.to(cursor, {
      autoAlpha: 0,
      duration: 0.3,
      ease: 'power3.out',
    });
  });

  // Изначально курсор скрыт
  gsap.set(cursor, { autoAlpha: 0 });
}
