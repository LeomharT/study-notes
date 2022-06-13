# useEffect

`useEffect()`副作用钩子函数。以前放在`componentDidMount`里面的代码，现在可以写在`useEffect()`。`useEffect()`会在***组件第一次渲染到屏幕之后***触发，并每次组件更新时根据***依赖数组***决定是否再次触发。

`	useEffect()`用法如下

```js
useEffect(()  =>  {
  // Async Action
}, [dependencies])
```

`	useEffect()`接收两个参数，第一个参数是函数，需要在组件渲染后触发的代码放在里面。第二个参数是一个数组，只要这个数组里面的值发生变化那么在***组件更新后***`useEffect()`就会执行。第二个参数可以忽略，那么每次组件渲染都会执行。(建议就算是没有也添加一个空数组做为第二参数，因为如果忽略很容易造成 `useEffect()`的无限循环(infinite loop))。

下面介绍一个例子

```js
const Person = ({ personId }) => {
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState({});

  useEffect(() => {
    setLoading(true); 
    fetch(`https://swapi.co/api/people/${personId}/`)
      .then(response => response.json())
      .then(data => {
        setPerson(data);
        setLoading(false);
      });
  }, [personId])

  if (loading === true) {
    return <p>Loading ...</p>
  }

  return <div>
    <p>You're viewing: {person.name}</p>
    <p>Height: {person.height}</p>
    <p>Mass: {person.mass}</p>
  </div>
}
```

上面的代码中每一次personId变化，`useEffect()`就会执行，并且组件第一次渲染后也会执行。

再看一个例子

```js
useEffect(() =>		
{
	if (isDarkMode)
	{
		SwitchTheme(ThemeType.DarkTheme);
	} else
	{
		SwitchTheme(ThemeType.DefaultTheme);
	}
	
	FetchDataAsync()
}, [isDarkMode]);
```

上面的代码中表示一个切换到暗黑模式和异步获取数据的代码。这时候根据触发机制，在首次渲染之后会根据是否为暗黑模式执行开关灯的效果，并且异步请求服务器上的数据。但是如果每次去切换开关灯会根据依赖项 `isDarkMode`再去执行一次 `useEffect()`并且再发送一次异步请求，这很明显是不必要的开销，因此可以调用多次 `useEffect()`。

```js
useEffect(() =>		
{
	if (isDarkMode)
	{
		SwitchTheme(ThemeType.DarkTheme);
	} else
	{
		SwitchTheme(ThemeType.DefaultTheme);
	}
}, [isDarkMode]);

useEffect(()=>
{
	//这里的函数最好是用useCallBack()
	FetchDataAsync()
},[FetchDataAsync])
```

如果使用函数组件时需要在组件卸载时做一些例如清除定时器,取消订阅等操作怎么办呢,在 `useEffect()` 中使用return()=>即可
达到类似类组件中组件卸载的功能.

```js
useEffect(()=>
{
  Do something when compoenet apear....

  return()=>{
    Do something when component gone...
  }
},[dep...]);

```