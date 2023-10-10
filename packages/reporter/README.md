# dde-log-report

这是一个用于在dde(深时数字地球)中进行埋点上报基础内容的插件。
在TypeScript环境下，可以免去查阅操作手册的麻烦。

包含内容：
  初始化页面加载时间、页面停留时间、页面打开上报、点击事件上报。
  数据使用：
  浏览器指纹-uuid(后续如需使用可直接通过localStorage获取)、
  sessionId(后续如需使用可直接通过cookies获取)。


## 安装

使用 npm 安装：

```bash
npm i dde-log-reporter
```

## 使用

注：AutoReport只可创建一次，若全局使用可挂载到window对象或其他形式，若需重新创建必须先销毁。

```ts
import { AutoReport } from 'dde-log-reporter';


// 创建配置上报插件

const reporter = new AutoReport(channel,targetUrl , authUrl, userID)

channel: string (平台)
targetUrl: string (上报地址)
authUrl: string (authTken验证地址)
userID: string (登录用户的用户名,未登录可传guest)

// reporter初始化
reporter.init( initOkEvent )

initOkEvent: () => void (在init结束后执行的回调函数，用于防止首次加载时init未完成就发送请求导致信息不全)

// 示例: 更新上报用户名(用户登录或注销时调用)
reporter.updateUser(userId)

userId: string

//示例： 点击事件上报
reporter.sendClkEvent(type, functionId,  utlogMap, sendOkEvent)

type：'clk' | 'search' | 'download'
functionId: string (上报的功能点Id)
utlogMap: any{} (此次上报所携带参数,对象形式，不需携带额外信息可不传)
sendOkEvent:  () => void (点击上报完成后要执行的回调函数,不需要可不传)

//示例：路由变化上报
reporter.sendPageOpenEvent(preUrl, sendOkEvent )

preUrl: string (路由变化之前url)
sendOkEvent:  () => void (上报完成后要执行的回调函数,不需要可不传)

// 示例: 销毁实例
  reporter.destroy();
```

## 浏览器使用

```html
<body>
  <div id="iframeContainer"></div>
</body>

<script src="http://unpkg.com/dde-log-reporter"></script>

<script>
// 创建配置上报插件
const reporter = new AutoReport(channel,targetUrl , authUrl, userID)

channel: string (平台)
targetUrl: string (上报地址)
authUrl: string (authTken验证地址)
userID: string (登录用户的用户名,未登录可传guest)

// reporter初始化
reporter.init( initOkEvent )

initOkEvent: () => void (在init结束后执行的回调函数，用于防止首次加载时init未完成就发送请求导致信息不全)

// 示例: 更新上报用户名(用户登录或注销时调用)
reporter.updateUser(userId)

userId: string

//示例： 点击事件上报
reporter.sendClkEvent(type, functionId,  utlogMap, sendOkEvent)
 
type：'clk' | 'search' | 'download'
functionId: string (上报的功能点Id)
utlogMap: any{} (此次上报所携带参数,对象形式，不需携带额外信息可不传)
sendOkEvent:  () => void (点击上报完成后要执行的回调函数,不需要可不传)

//示例：路由变化上报
reporter.sendPageOpenEvent(preUrl, sendOkEvent )

preUrl: string (路由变化之前url)
sendOkEvent:  () => void (上报完成后要执行的回调函数,不需要可不传)

// 示例: 销毁实例
reporter.destroy();

</script>
```


### reporter初始化配置项

```ts
注：所有参数顺序需固定。
type ReporterOptions = {
  channel: string;
  targetUrl: string;
  authUrl: string;
  userID: string;
};
```