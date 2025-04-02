const UA = navigator.userAgent.toLowerCase();

export function isPC() {
  if (UA.indexOf('iphone') !== -1 || UA.indexOf('android') !== -1) {
    return false;
  } else if (UA.indexOf('ipad') > -1) {
    return false;
  } else if ((UA.indexOf('android') > -1) && (UA.indexOf('mobile') === -1)) {
    return false;
  }

  return true;
}

export function isSP() {
  if (UA.indexOf('iphone') !== -1 || UA.indexOf('android') !== -1) {
    return true;
  } else if (UA.indexOf('ipad') > -1) {
    return true;
  } else if ((UA.indexOf('android') > -1) && (UA.indexOf('mobile') === -1)) {
    return true;
  }

  return false;
}

export function isTablet() {
  if (UA.indexOf('ipad') > -1) {
    return true;
  } else if ((UA.indexOf('android') > -1) && (UA.indexOf('mobile') === -1)) {
    return true;
  }

  return false;
}

function deviceTypeURL() {
  let device;
  window.location.search.substring(1).split('&').map((param) => {
    if (param.indexOf('device_type=desktop') !== -1) {
      device = 'desktop';
    } else if (param.indexOf('device_type=mobile') !== -1) {
      device = 'mobile';
    }
  });
  return device;
}

export default function deviceType() {
  const device = deviceTypeURL();
  if (device) {
    return {
      device,
      hasParams: true,
    };
  } else if (isPC()) {
    return {
      device: 'desktop',
      hasParams: false,
    };
  }

  return {
    device: 'mobile',
    hasParams: false,
  };
}
