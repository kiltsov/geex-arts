const hoverElements = document.querySelectorAll('[hover-element]');

export { hoverElements };

// IS MOBILE CONDITION
export function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}