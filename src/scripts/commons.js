import deviceType from '@scripts/device-type.js';

const commons = document.createElement('script');
commons.src = '/commons/1/scripts/commons.js';
document.getElementsByTagName('head')[0].appendChild(commons);
commons.addEventListener('load', () => {
  const commonSrcList = [
  `/commons/1/scripts/common-header-responsive.js`,
  `/commons/1/scripts/common-footer-responsive.js`,
  `/commons/1/scripts/common-onair-responsive.js`,
  `/commons/1/scripts/common-tver-ranking.js`,
  `/commons/1/scripts/common-present-responsive.js`,
  `/commons/1/scripts/common-ranking-responsive.js`,
  `/commons/1/scripts/common-related-shows-responsive.js`,
  ];
  commonSrcList.forEach((src) => {
    const script = document.createElement("script");
    script.src = src;
    document.body.appendChild(script);
  });
});

if (import.meta.env.MODE === 'development') {
  const { device } = deviceType();
  document.body.classList.add(`device-type-${device}`);

  // change src common-related-shows
  const target = document.getElementById('common-related-shows')
  const observer = new MutationObserver(records => {
    const imageList = target.querySelectorAll('img');
    if (imageList.length === 0) return;
    imageList.forEach(image => {
      const src = image.getAttribute('src')
      image.setAttribute('src', `https://www.tv-asahi.co.jp${src}`)
    })
  })
  observer.observe(target, {
    childList: true
  })
}
