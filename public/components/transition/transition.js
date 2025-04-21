export const transitionComponent = {
  transition_column: '.transition_column',
  transition_wrap: '.transition_wrap',
  excluded_class: '.excluded-class',
}


export function pageTransition() {
  // page load
  let pageTransitionTimeline = gsap.timeline();
  pageTransitionTimeline.to(transitionComponent.transition_column, {
    yPercent: -100,
    stagger: 0.05,
  });
  pageTransitionTimeline.set(transitionComponent.transition_wrap, { display: 'none' });

  // link click
  $(`a:not(${transitionComponent.excluded_class})`).on('click', function (e) {
    let currentUrl = $(this).attr('href');
    if (
      $(this).prop('hostname') === window.location.host &&
      !currentUrl.includes('#') &&
      $(this).attr('target') !== '_blank'
    ) {
      e.preventDefault();
      // lenis.stop();
      let pageTransitionTimeline = gsap.timeline({
        onComplete: () => (window.location.href = currentUrl),
      });
      pageTransitionTimeline.set(transitionComponent.transition_wrap, { display: 'flex' });
      pageTransitionTimeline.fromTo(transitionComponent.transition_column, { yPercent: 100 }, { yPercent: 0, stagger: 0.05 });
    }
  });
  // On Back Button Tap
  window.onpageshow = function (event) {
    if (event.persisted) window.location.reload();
  };
}
