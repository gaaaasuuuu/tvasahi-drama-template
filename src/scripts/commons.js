import deviceType from '@scripts/device-type.js';

if (import.meta.env.MODE === 'production') {
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
} else {
  const { device } = deviceType();
  document.body.classList.add(`device-type-${device}`);
}
