import { AutoReport } from 'dde-log-reporter';



const reporter = new AutoReport('platform', 'http://log-analysis-dev.deep-time.org/ddeAnalytics/utlog', 'guest');

setTimeout(()=>{
  console.log('user');
  reporter.updateUser('test')

}, 10 * 1000)

setTimeout(()=>{
  console.log('user');
  reporter.sendPageOpenEvent('测试页面')

} , 15 * 1000)