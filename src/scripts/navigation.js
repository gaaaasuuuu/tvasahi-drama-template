import deviceType from '@scripts/device-type.js';
const { device } = deviceType();


(() => {
  if (device === 'desktop') return;

  const nav = document.querySelector('.navigation');
  const floating = document.querySelector('.floating');
  const floatingNav = nav.cloneNode(true);
  floatingNav.className = 'floating__nav__container';
  const floatingChild = floatingNav.children;
  [...floatingChild].forEach(el => {
    el.classList.replace('navigation', 'floating__nav');
  });
  floating.appendChild(floatingNav);


  const options = {
    // root: document.querySelector('.root'),
    // rootMargin: '5%',
    // threshold: [0, 0.5, 1.0],
    threshold: 0,
  }
  const observer = new IntersectionObserver((entries) => {
    for(const e of entries) {
      // console.log(e);
      // console.log(e.isIntersecting);

      if (e.isIntersecting === false) {
        floating.classList.add('fixed');
      }
      if (e.isIntersecting === true) {
        floating.classList.remove('fixed');
      }

    }
  }, options);

  // 監視したい要素をobserveする。
  observer.observe(nav);
})();
