# React

## 进行判断时渲染"0"

![image-20210623151415247](C:\Users\cf\AppData\Roaming\Typora\typora-user-images\image-20210623151415247.png)

加上类型约束

## Add a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display.

懒加载的问题加入

```
import { Suspense } from 'react';
```

```
  <Suspense fallback={<Spin />}>  </Suspense>
```

## 获取控件内容问题

```jsx
HandleSelectOnChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    {
        console.log(e.target.value);
    };
 <div className="select">
      <HTMLSelect
        options={this.categories}
        onChange={e => this.HandleSelectOnChange(e)}
       />
  </div>
```

## react脚手架public路径问题

```
../表示public文件夹？？好像是这个样的
```

## React中如果添加DOM元素是一个字符串,没有JSX解析的话

```jsx
//使用ReactDOM.render 哈哈哈太牛了 如果当你不能使用JSX语法的话
//ReactDOM.render将React组件渲染到dom树下面
ReactDOM.render( React.createElement(Button, { children: "hahah" }), document.querySelector('#MapInfoWindow'));
```



# Three.js

## 如何引入{OrbitControls}实现鼠标操作和缩放

![image-20210625095531235](C:\Users\cf\AppData\Roaming\Typora\typora-user-images\image-20210625095531235.png)

# offsetTop,offsetHeight,clientHeight,scrollHeight,scrollTop图解

![这里写图片描述](https://img-blog.csdn.net/20180411103001981?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3lvdXRoX2x4/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)





  

```
whenResourceDrag = async (targetElement: React.MouseEvent<HTMLDivElement>, e: React.MouseEvent) =>

  {

​    let dragDiv = targetElement.target as HTMLDivElement; //[资源]

​    let containerDiv = dragDiv.parentElement; //[拖动区域].获取[被拖元素]的父级元素

​    let cloneDiv = (dragDiv.cloneNode()) as HTMLDivElement;//[被拖元素] 克隆[资源] 在界面上看到的就是这个

​    let renderZone = app.Viewer.Renderer.domElement; //[画布区域]



​    containerDiv.appendChild(cloneDiv);

​    cloneDiv.style.transition = ""; //[被拖元素]的style设置下

​    cloneDiv.style.position = "absolute";

​    cloneDiv.style.opacity = "0.5";



​    let downX = e.clientX; //鼠标X

​    let downY = e.clientY; //鼠标Y



​    let offsetX = dragDiv.offsetLeft; //计算[资源]的偏移量

​    let offsetY = dragDiv.offsetTop;



​    cloneDiv.style.left = offsetX + "px"; //设置[被拖元素]的起始位置

​    cloneDiv.style.top = offsetY + "px";



​    containerDiv.onmousemove = (event: MouseEvent) =>

​    {

​      let moveX = event.clientX;

​      let moveY = event.clientY;

​      let positionX = moveX - downX;

​      let positionY = moveY - downY;



​      // console.log(positionX);



​      cloneDiv.style.left = offsetX + positionX + "px"; //拖动的时候[被拖元素]也得加上

​      cloneDiv.style.top = offsetY + positionY + "px";

​    };

​    containerDiv.onmouseleave = async () => //离开资源面板的时候

​    {

​      if (containerDiv.contains(cloneDiv)) //如果我有点击才会克隆,有克隆才会触发绘制动作

​      {

​        containerDiv.removeChild(cloneDiv);

​        this.whenResourceClick();

​      }



​    };

  };
```

# 克隆元素、创造元素





# 防止选取 <div> 元素的文本

```css
div {
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10+ and Edge */
  user-select: none; /* Standard syntax */
}
```

# 添加事件无参数使用

dom.addEventListener

有参数就用

dom.onxxxx=()=>{}

移除就等于null



# 这个key 一般不会使用数组的index

The Lost Forerunner(陈雄) 15:00:29
因为会有问题

The Lost Forerunner(陈雄) 15:00:46
 当数组变更的时候

数组的索引将会分配给其他的成员

The Lost Forerunner(陈雄) 15:00:52
此时造成react渲染错误

The Lost Forerunner(陈雄) 15:01:00
这个key要唯一性 不是给一个就行



# NodeJS

## 使用Post必须使用中间件

```nodejs
const bodyParser = require("body-parser"); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

在高版本合并了,框架里面自带
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
```

## Nojs跨域

```
app.all("*", (req, res, next) => {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers", "content-type");
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == 'options')
​    res.send(200);
  else
​    next();
});
```

或者

```
const cors = require("cors");
app.use(cors());
```

## 用fetch提交json一定要加上header！！！！

## 关于FormDataNodeJS后台如何获取

```js
用插件去格式化FormData 不需要Header！！
const multiparty = require("multiparty");
app.post('/index',function(req,res){
  let form = new multiparty.Form();
  form.parse(req, function(err,fields,file){
    console.log(fields);
    res.send('数据已接收');
  });
})
```

# ReactRouter

## 类组件必须导出为Router组件才能获取到URL里的参数！！！

https://www.jianshu.com/p/8d3cf411a639 withRouter Props还必须继承RouteComponentProps
https://segmentfault.com/q/1010000016450394 reactrouter 获取参数

动态路由参数后面

```
/:id?
```

表示该参数为可选



# MobX Store

用于实例单例的store

```tsx
private static _SingleInstance:Store
static GetInstance():Store{
    if(this._SingleInstance)return this._SingleInstance //不会重复去实例化,即可只发送一次异步请求
    this._SingleInstance=new Store()
    return this._SingleInstance;
}
```

# 关于多条件查询

主要还是字符串拼接的问题

# [一行 CSS 代码实现全站中文简繁转换](https://www.zhangxinxu.com/wordpress/2021/01/css-simplified-traditional-chinese/)

CSS 命令 `font-variant-east-asian: traditional;`，可以让网站字体从简体变成繁体。

# Git

如果分支出现unpushed

![image-20210723205042237](C:\Users\13055\AppData\Roaming\Typora\typora-user-images\image-20210723205042237.png)

# 模块化应用如何使用script导入外部模块

https://www.cnblogs.com/softidea/p/6946779.html

# 科大讯飞的worker.js文件需要使用webpack的worker-loader包

在webpack.config.js里面找到rules，添加:

```json
  {
     test: /\.worker\.js$/,
     use: { loader: "worker-loader" },
  },
```



# Nprocess.js别忘记引用他的css和element或者antd一样啊傻瓜
