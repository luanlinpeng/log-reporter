import Cookies from "js-cookie";

export function newTerminalInfo() {
  var u = navigator.userAgent, app = navigator.appVersion;
  const info = {  // 移动终端浏览器版本信息 
    trident: u.indexOf('Trident') > -1,  // IE内核
    presto: u.indexOf('Presto') > -1,    // Opera内核
    webKit: u.indexOf('AppleWebKit') > -1,  // 苹果、谷歌内核
    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,  // 火狐内核
    mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/) && u.indexOf('QIHU') && u.indexOf('Chrome') < 0,  // 是否为移动终端  
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),  // iOS终端
    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,  // Android 终端或者 UC 浏览器
    iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1,  // 是否为 iPhone 或者 QQHD 浏览器
    iPad: u.indexOf('iPad') > -1,   // 是否 iPad
    webApp: u.indexOf('Safari') == -1,   // 是否WEB应该程序，没有头部与底部。
    ua: u
  };
  if (!info.mobile) {
    return 'pc'
  } else {
    return 'mobile'
  }
}

export function isMinStatus() {
  let isMIN = false;
  //IE
  if (document.msVisibilityState) {
    if (document.msVisibilityState == "visible") {
      isMIN = false;
    } else {
      isMIN = true;
    }
  }
  //火狐
  if (document.mozVisibilityState) {
    if (document.mozVisibilityState === 'visible') {
      isMIN = false;
    } else {
      isMIN = true;
    }
  }
  //谷歌
  if (document.webkitVisibilityState) {
    if (document.webkitVisibilityState == "visible") {
      isMIN = false;
    } else {
      isMIN = true;
    }
  }
  return isMIN
}

export function getCookieId() {
  return Cookies.get('sessionId')
}

export function setCookieId(val: string) {
  let millisecond = new Date().getTime();
  let expiresTime = new Date(millisecond + 60 * 1000 * 3);

  switch (document.domain.split('.').length) {
    case 1:
      Cookies.set('sessionId', val, { domain: document.domain, expires: expiresTime })
      return
    case 2:
      Cookies.set('sessionId', val, { domain: '.' + document.domain, expires: expiresTime })
      return
    case 3:
      Cookies.set('sessionId', val, { domain: '.' + document.domain.split('.')[1] + '.' + document.domain.split('.')[2], expires: expiresTime })
      return
    case 4:
      Cookies.set('sessionId', val, { domain: '.' + document.domain.split('.')[2] + '.' + document.domain.split('.')[3], expires: expiresTime })
      return
  }
}
