export const textComponent = {
  elementFadeInto: document.querySelectorAll('[split-text="effect-fade-into"]'),
};

export function textFadeIntoAnimation() {
    if (!textComponent.elementFadeInto.length) return;
  
    textComponent.elementFadeInto.forEach((el) => {
      // Сначала скрываем элемент
    //   el.style.visibility = 'hidden';
  
      // Разбиваем текст на буквы
      const split = new SplitText(el, { type: 'chars', charsClass: 'split-char' });
  
      // Устанавливаем начальные стили на буквы
      gsap.set(split.chars, {
        opacity: 0,
        filter: 'blur(16px)',
        y: 20,
      });
  
    //   // Показываем родителя после подготовки
    //   el.style.visibility = 'visible';
  
      // Сразу запускаем анимацию появления букв
      const tl = gsap.timeline();
      tl.to(split.chars, {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.03,
      });
    });
  }
