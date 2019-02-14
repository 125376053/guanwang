## 使用方法

### 开发环境
``` javascript
npm run dev   //  进入开发环境
```
>在浏览器输入: localhost:5000

### 生产环境

```javascript 
npm install pm2 -g  // 全局安装pm2
npm run build // 编译压缩静态资源
pm2 start index.js  // 运行服务
```

>在浏览器输入: localhost:8888

### 描述

是用`gulp`做项目构建,具体配置可以去看`gulpfile.js`