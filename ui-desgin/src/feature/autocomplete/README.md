# Autocomplete 

1. 组件props

   ```
   AutocompleteProps={
   	autucompleteItems:{[index:string]:string,value:string};		->自动填写的选项,用于正则匹配和默认选择,接受一个数组
   	required:boolean;											->是否一定需要接受一个值
   	dropdownPosition:string; 									->显示选择位置,默认最好是能够自动根据组件位置显示弹出框位置
   	value:string; 												->组件返回值
   	defalutValue:string 										->组件默认值
   	initiallyOpened:boolean; 									->是否默认展开弹出框
   	withPortal:boolean; 										->是否使用protal渲染
   	onChange:()=>string;  										->组件值变化的回调函数
   	onSubMit:()=>string; 										->组件提交时的回调函数
   	onDropdownClose:()=>void,									->弹出框关闭时的回调函数
       onDropdownOpen:()=>void,									->弹出框打开时的回调函数
   	...others													->其他通用的组件props例如size,className等这里不列出了
   }
   ```

   上面基本就是Autocomplete组件比较独特的props,其他基本是所有组件都通用的类型.

   这里的输入类型不必一一映射到forwardRef,选一些允许用户直接操作的DOM操作,封装好即可

2. hooks

   `useDebounce`

   ```
   useDebounce.ts
   
   export default function useDebounce<T = any>(defaultValue: T, time: number)
   {
       const [value, setValue] = useState<T>(defaultValue);
   
       const timerRef: RefObject<NodeJS.Timeout | null> = useRef<NodeJS.Timeout | null>(null);
   
       const setDebounceValue = (newValue: T) =>
       {
           if (timerRef.current) clearTimeout(timerRef.current);
   
           (timerRef.current as NodeJS.Timeout) = setTimeout(() =>
           {
               setValue(newValue);
           }, time);
   
           (timerRef.current as null) = null;
       };
   
       return [value, setDebounceValue] as const;
   }
   ```

   上面这个防抖函数比较重要,用户控制输入框的值匹配选项数组的频率.

   `forwardRef` 

   Autocomplete这个组件不能简单作为React.FC,要用forwardRef包装组件,这样用户可以使用useRef或者createRef来控制组件状态,当然也可以选择不做.

3. css

   这个组件没什么特别的CSS结构,因为都是使用之前的组件封装出来的.所以大多都是逻辑代码.很少样式.

4. html

   html结构

   ```
   <div>  		  最外层的wrapper
   	<input/>  输入框组件,不是原生输入框
   	<div>	  弹出框,可以选择protal渲染
   		<selections> 选项集合，不能用HTMLSelectElement 或者 HTMLDataListElement 原因是没办法自定义样式
   			...<option/>
   		</selections>
   	</div>
   </div>
   ```

5. 其他注意点

   1. 实现键盘上下选择选项在onKeyDown中实现
   2. 这个组件基本是纯逻辑组件,样式可以调整弹出框的阴影模糊范围,或者的input的边框颜色,但基本也在其他基础组件内完成,所以这个组件依赖比较强,可以考虑放到后面实现
   3. 选项可以做成带图片的会比较有趣,但参考其他组件库基本选项都是纯文本加图标

