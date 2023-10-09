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


// 创建初始化上报插件

  const reporter = new AutoReport('平台','XXXXXXX上报地址', 'authTken验证地址', '用户名')

// 示例: 更新上报用户名(用户登录或注销时调用)
  reporter.updateUser('用户名')

//示例： 点击事件上报
 reporter.sendClkEvent('type', 'functionId', '携带参数(对象形式，不需携带额外信息可不传)')
 
 type类型：'clk' | 'search' | 'download'

//示例：路由变化上报
reporter.sendPageOpenEvent('preUrl(路由变化之前url)')

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
// 创建初始化上报插件
const reporter = new Reporter.AutoReport('平台','XXXXXXX上报地址', 'authTken验证地址', '用户名')

// 示例: 更新上报用户名(用户登录或注销时调用)
  reporter.updateUser('用户名')

//示例： 点击事件上报
 reporter.sendClkEvent('type', 'functionId', '携带参数(对象形式，不需携带额外信息可不传)')
 
 type类型：'clk' | 'search' | 'download'

//示例：路由变化上报
  reporter.sendPageOpenEvent('preUrl(路由变化之前url)')

// 示例: 销毁实例
  reporter.destroy();

</script>
```


### reporter初始化配置项

```ts
注：创建时参数顺序需固定。
type ReporterOptions = {
  channel: string;
  targetUrl: string;
  authUrl: string;
  userID: string;
};
```