export const transitionComponent = {
  component: document.getElementById('transitionComponent'),
  transition_column: document.querySelector('.transition_column'),
  transition_wrap: document.querySelector('.transition_wrap'),
  excluded_class: document.querySelector('.excluded-class'),
};

export function pageTransitionAnimation(callback) {
  if (!transitionComponent.component) return;

  let pageTransitionTimeline = gsap.timeline({
    onComplete: () => {
      if (typeof callback === 'function') {
        callback(); // Запускаем пользовательский код после перехода
      }
    }
  });

  pageTransitionTimeline.to(transitionComponent.transition_column, {
    delay: 0.5,
    yPercent: -100,
    duration: 1.5,
  });

  pageTransitionTimeline.set(transitionComponent.component, { display: 'none' });

  // link click
  $(`a:not(${transitionComponent.excluded_class})`).on('click', function (e) {
    let currentUrl = $(this).attr('href');
    if (
      $(this).prop('hostname') === window.location.host &&
      !currentUrl.includes('#') &&
      $(this).attr('target') !== '_blank'
    ) {
      e.preventDefault();
      let pageTransitionTimeline = gsap.timeline({
        onComplete: () => (window.location.href = currentUrl),
      });
      pageTransitionTimeline.set(transitionComponent.component, { display: 'block' });
      pageTransitionTimeline.fromTo(transitionComponent.transition_column, { yPercent: 100 }, { yPercent: 0, stagger: 0.05 });
    }
  });

  // On Back Button Tap
  window.onpageshow = function (event) {
    if (event.persisted) window.location.reload();
  };
}
