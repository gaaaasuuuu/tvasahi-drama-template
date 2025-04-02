import { debounce } from 'throttle-debounce';

export default function scrollToTop() {
  const el = document.querySelector('#page-up');
  const state = {
    scrollY: 0,
    el: null,
    display: false,
  };

  if (el) {
    el.addEventListener('click', (e) => {
      window.addEventListener('scrollend', (e) => {
        history.pushState({}, '', location.pathname);
      }, {
        once: true
      });
    });
    onHandleAppearance();
  }

  function onHandleAppearance() {
    window.addEventListener('scroll', debounce(250, () => {
      const scrollY = window.scrollY;
      if (scrollY !== 0 && !state.display) {
        fadeIn();
        state.display = true;
      } else if (scrollY === 0 && state.display) {
        fadeOut();
        state.display = false;
      }
    }), false);
  }

  function fadeOut() {
    el.style.opacity = 1;

    let val = 1;
    (function fade() {
      if (val >= 0) {
        val -= 0.075;
        el.style.opacity = val;
        window.requestAnimationFrame(fade);
      } else {
        el.style.display = 'none';
        val = 1;
      }
    })();
  }

  function fadeIn() {
    el.style.opacity = 0;
    el.style.display = 'block';

    let val = 0;
    (function fade() {
      if (val <= 1) {
        val += 0.075;
        el.style.opacity = val;
        window.requestAnimationFrame(fade);
      } else {
        val = 0;
      }
    })();
  }
};
