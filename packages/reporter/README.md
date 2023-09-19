# dde-log-report


这是一个用于在dde(深时数字地球)中进行埋点上报基础内容的插件。
在TypeScript环境下，可以免去查阅操作手册的麻烦。

包含内容：
  初始化页面加载时间、页面停留时间。
  数据使用：
  浏览器指纹-uuid(后续clk上报可直接通过localStorage获取)、
  sessionId(后续clk上报可直接通过cookies获取)。


## 安装

使用 npm 安装：

```bash
npm i dde-log-reporter
```

## 使用

```ts
import { AutoReport } from 'dde-log-reporter';


// 创建初始化上报插件

  const reporter = new AutoReport('平台','XXXXXXX上报地址', '用户名')

// 示例: 更新上报用户名

  reporter.updateUser('用户名')



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
const reporter = new Reporter.AutoReport('平台','XXXXXXX上报地址', '用户名')

// 示例: 更新上报用户名
reporter.updateUser('用户名')

// 示例: 销毁实例
reporter.destory();

</script>
```


### reporter初始化配置项

```ts
type ReporterOptions = {
  channel: string;
  targetUrl: string;
  userID: string;
};
```