# Error report

## Stylelint

### 关于Stylelint报错未找到配置:

It looks like you haven't created a configuration yet. You can do so by [following the docs](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/configuration.md). The easiest way is to extend [the standard config](https://github.com/stylelint/stylelint-config-standard) e.g.

```
npm i stylelint --save-dev
npm i stylelint-config-standard --save-dev
```

Then put the following in your config:

```
{
  "extends": "stylelint-config-standard"
}
```

e.g. in a `.stylelintrc.json` file *in the root of your project*. (e.g.=exempli gratia)

#

## PHP

### fetch

json传输时的头文件

```
headers:{
  'Content-Type': 'application/json;charset=utf-8',
},
```

后台获取的方法

```
file_get_contents("php://input")
```

true的意思的返回一个数组

```
json_decode(file_get_contents("php://input"),true);
```

#### 关于fetch异步方法如何操作promise

```
async function GetData(){
  try{
    let response=await fetch("http://localhost/PHP_Pro01/vue_pro01/getNewsList.php")
    let result=await response.json()
    return result
  }catch(e){
   console.log(e)
  }
}
GetData().then((response)=>{
  console.log(response)
})
```

# Vue3.0X

## 配置webpack打包的配置文件:

根目录下vue.config.js文件(没有自己建啊)

```
module.exports = {
    publicPath: "./", // 公共路径(必须有的)
    outputDir: "dist", // 输出文件目录
    //assetsDir: "static", //静态资源文件名称
    lintOnSave: false,
    productionSourceMap: false, //去除打包后js的map文件
    devServer: { //启动项目在8080端口自动打开
        open: true,
        port: 8080,
        proxy: null
    },
    //去掉console
    configureWebpack: (config) => {
        // 判断为生产模式下，因为开发模式我们是想保存console的
        if (process.env.NODE_ENV === "production") {
            config.optimization.minimizer.map((arg) => {
                const option = arg.options.terserOptions.compress;
                option.drop_console = true; // 打开开关
                return arg;
            });
        }
    },
};
```

## 关于跨域问题(Fetch,Axios)

最近接触到所谓的前后端分离开发模式，但一直没搞懂是什么意思。

简单来说就是解决跨域问题，然后前端文件部署的域名去访问后台部署的域名从而进行整合。

### Java

@CrossOrigin可以处理跨域请求，让你能访问不是一个域的文件。
同域是指协议、ip地址、端口三者全部相同的情况。

在你的controller的方法上边添加@CrossOrigin即可让不同端口访问。

### PHP	

```
header('Access-Control-Allow-Origin:*');
header("Access-Control-Allow-Headers: *");允许带参数嘛，就是你post提交的数据能进去
```

## Axios

vue3.0如何挂载使用axios(main.js) 

```
import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
//设置baseurl免去前面的url地址
axios.defaults.baseURL="http://localhost/PHP_Pro01/vue_pro01/"
 const app = createApp(App)
 app.config.globalProperties.axios=axios //app.config.globalProperties.$axios=axios区别是使用是有没有$符号
 
 app.mount("#app")


```

### X-XSRF-TOKEN跨域阻拦

```
只需要用axios去搞一个正常的ajax请求就得了他请求头会重置
```

## Iframe

在iframe中如果请求使用麦克风和摄像头被拒绝的话：

```
<iframe src="http://localhost:8080/Voice" allow='microphone;camera;midi;encrypted-media;'></iframe>
```

------

关于iframe的跨域问题

iframe在跨域访问的时候会有严格的要求，比ajax跨域请求还要难解决 浏览器判断是否跨域会根据两种情况，一个是网页的协议(protocol)，一个就是host是否相同，即，就是url的首部

就是如果端口号不同的话浏览器就会视为需要进行跨域请求或者你域名就不同

解决方案-----降域：父子都需要降域

```
document.domain ="localhost" 
```

## Vue等待DOM渲染完成再执行

```js
mounted() {
  this.$nextTick(function () {
    // 仅在渲染整个视图之后运行的代码
  })
}
```

# Vue-Router@4

## 创建方法

新建一个js文件

```
import {createRouter,createWebHistory} from 'vue-router'
import Header from '../components/Header'
import TestVue from '../components/TestVue'
const router=new createRouter({
  history:createWebHistory(),
  routes:[
    {path:"/Header",component:Header},
    {path:"/TestVue",component:TestVue}
  ]
})
export default router
```

得在main.js中引用

```
//入口文件全局配置
import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import ElementUI from 'element-plus'
import './assets/css/font-awesome.min.css'
import router from './route/index'

const app = createApp(App)
app.config.globalProperties.axios=axios
app.use(ElementUI)
app.use(router)
app.mount("#app")
```

## 动态路由设置方式 

```
{name:"User",component:User,path:"/User/:id"}
```

:id表示你User/abc,abc就是id的值

```
<router-link to="/User/abc" :tag="li">
```

或者

```
<router-link :to="{name:'User',params:{id:1}}">
```

## 路由参数

```
<router-link :to="{name:'User',query:{id:1}}">
```

## 守卫路由(组件内的守卫)路由同样能用Props

简单理解为路由发生变化时会触发的方法写在组件内，与data同级。

复用组件时，就是在当前组件进行路由更改时会调用

```js
beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate(to, from, next) { 
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
```

# React

```
npx create-react-app my-app
```

```
npm i node-sass --save-dev
```

```
vscode

rcc
```

## mobx

需使用这个状态管理需配置

去官网安装啊这里不记录了

只需要按照5.x 和 6.x的版本才能使用装饰器语法

react的话还得安装mobx-react

### experimentalDecorators

报错是因为这是es7的实验性语法

只要在项目根目录下创建一个jsconfig.json文件如果是ts就是tsconifg.json

```
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```

### Support for the experimental syntax 'decorators-legacy' isn't currently enab

没开器修饰器！！！新语法得配置的配置一直配置阿

先安装依赖包

```js
npm install  customize-cra react-app-rewired @babel/plugin-proposal-decorators --save
```

项目根目录新建config-overrides.js文件加入以下代码:

```js
const { override, addDecoratorsLegacy } = require('customize-cra');
module.exports = override(
 addDecoratorsLegacy()
 );
```

！！！修改package.json文件如下：！！！不改没用

```js
"scripts": {
 "start": "react-app-rewired start",
 "build": "react-app-rewired build",
 "test": "react-app-rewired test",
 "eject": "react-app-rewired eject"
  },
```

然后重启

## styled-components

```undefined
npm install --save styled-components
```

## 关于循环

vue中用指令就行v-for v-if 之类的vue指令(突然感觉vue很好用)

而react则用map去遍历数组中的元素(没错和scala中的map作用相同！！！)

如果不更新记住加key

## 等待DOM渲染完成再执行

```
componentDidMount()
{

}
```



# Emoji

Emoji存入数据库只需注意编码即可utf8mb4



# VueX保存

sessionstorage localstorage或vue数据持久化

# TypeScript

React安装使用TS 使用后缀名为.tsx

> npm install typescript --save
>
> npm i --save @types/react

# Moment

# Sessionstorage
