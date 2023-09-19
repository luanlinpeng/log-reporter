import { getFinger } from ".";
import { nanooid } from "./nanooid";
import { getCookieId, isMinStatus, newTerminalInfo, setCookieId } from "./util";
import moment from 'moment';





export class autoReport {
  cookieIdval: any = null;
  interval: any = null;
  channel = '';
  targetUrl = '';
  userID = '';


  constructor(channel: string, targetUrl: string, userID: string) {
    this.channel = channel;
    this.targetUrl = targetUrl;
    this.userID = userID;
    if (!getCookieId()) {
      const temp = nanooid();
      this.cookieIdval = temp;
      setCookieId(temp)
    } else {
      this.cookieIdval = getCookieId();
    }

    const time = moment().format("YYYY-MM-DD HH:mm:ss")
    window.localStorage.setItem('beforeTime', time);
    document.addEventListener('click', this.setClickTime)

    if (!localStorage.getItem('uuid')) {
      getFinger().then(id => {
        localStorage.setItem('uuid', id);
      })
    }

    this.loadTimeSend();
    setTimeout(() => {
      const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.fetchStart;
      const referrer = document.referrer ? document.referrer : '直接访问';

      const obj = {
        userId: userID || 'guest',
        cookieId: getCookieId(),
        clientType: newTerminalInfo(),
        lang: localStorage.getItem('locale') || 'en-US',
        url: window.location.href,
        uuid: localStorage.getItem('uuid'),
        preUrl: referrer,
        eventType: 'loadTime',
        channel,
        utlogMap: `{loading_time: ${loadTime}}`,
      }
      fetch(targetUrl, {
        method: 'post',
        body: JSON.stringify(obj),
        headers: {
          'Content-Type': 'application/json'
        }
      })

    }, 20 * 1000)

  }

  loadTimeSend = () => {
    this.interval = setInterval(() => {
      if (isMinStatus()) {
        //是最小化
        return
      } else {
        const beforeTime = window.localStorage.getItem('beforeTime');
        const time = moment().format("YYYY-MM-DD HH:mm:ss")
        const timeDiff = moment(time).diff(beforeTime, 'minute')
        if (timeDiff > 20) {
          return
        }
        //发送
        const referrer = document.referrer ? document.referrer : '直接访问';
        const obj = {
          url: window.location.href,
          userId: this.userID || 'guest',
          uuid: localStorage.getItem('uuid'),
          cookieId: getCookieId(),
          eventType: 'visitTime',
          clientType: newTerminalInfo(),
          lang: localStorage.getItem('locale') || 'en-US',
          preUrl: localStorage.getItem('preUrl') ?? referrer,
          channel: this.channel,
        }
        fetch(this.targetUrl, {
          method: 'post',
          body: JSON.stringify(obj),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        setCookieId(this.cookieIdval)
      }
    }, 60 * 1000)
  }

  setClickTime = () => {
    const time = moment().format("YYYY-MM-DD HH:mm:ss")
    window.localStorage.setItem('beforeTime', time);
  }

  updateUser = (newUserId: string) => {
    this.userID = newUserId;
    clearInterval(this.interval);
    this.loadTimeSend();
  }

  destroy() {
    clearInterval(this.interval); 
  }
}

