### 正则原型方法 RegExp.prototype



#### exec 捕获

在指定的字符串中执行一个搜索匹配。 返回一个**数组或者nul**l。

**如果只是判断是否匹配 就使用test方法 或者search**



> 参数 要匹配正则表达式的字符串



> 返回值
>
> 如果匹配成功 exec 方法返回一个数组 更新正则表达式对象的属性 返回的数组将完全匹配成功的文本作为第一项 将正则括号里匹配成功的作为数组填充到后面



```javascript

const REG = /quick\s(brown).+?(jumps)/ig;

let ret = REG.exec('The Quick brown for jumps over The Lazy Dog');

```



| 对象 | 属性/索引     | 描述                             | 例子                                                         |
| ---- | ------------- | -------------------------------- | ------------------------------------------------------------ |
| ret  | [0]           | 匹配的全部字符串                 | Quick brown For jumps                                        |
|      | [1], ..., [n] | 括号中的分组匹配                 | [1] = brown                                                                 [2] = jumps |
|      | Index         | 匹配到的字符位于原始字符的索引值 | 4                                                            |
|      | input         | 原始字符值                       | The Quick brown for jumps over The Lazy Dog                  |



#### test 匹配

从字符串的左侧开始匹配。匹配到符合正则规则的字符 返回 true。 否则返回false 同样的test 在修饰符g下也会修改 lastIndex的值。



**运用test实现捕获**



```javascript
const REG = /\{([a-z]+)\}/g;

let ret = [];

let str = 'my name is {lisi}, I am from {china}';

while(REG.test(str)) {
    ret.push(RegExp.$1);
}
ret; // ['lisi', 'china']
```

当 字符匹配到结尾 或者匹配不到的时候。 返回false 成功则向数组添加当前小分组匹配第一个元素内容。RexExp.$1- \$9 的内容。



### 字符串的正则方法 String.prototype



* 1 match

  > match 同样是捕获的方法

  str.match(reg);

  **参数**

  * reg 一个正则表达式 如果传入的不是正则 则会隐式的使用new RegExp转换成一个正则。 如果没有提供任何参数 则返回空数组 []

​	**返回值**

​	   如果匹配到了表达式 返回一个数组 第一项是 进行匹配完整的字符串 之后的项是圆括号捕获的结果 如果没有匹配到 返回null。



```javascript
const reg = /^(\d{6})(\d{4})(\d{2})/;

let txt = '2018102623121';

let ret = txt.match(reg); // 没有g [201810262312]

// 有["201810262312", "201810", "2623", "12", index: 0, input: "2018102623121", groups: undefined]

```

#### 注意点

如果正则表达式不包含g标志 返回和 exec一样的结果。如果包含g标志 返回一个数组 包含所有匹配的子字符串而不是匹配对象。 捕获组不会被返回。 如果没有匹配到 则返回 null。 



* 2 replace是string对象上正则匹配的方法。   返回一个由**替换值替换一些或所有匹配模式后的新字符串。不会改变原字符串。 模式可以是一个字符串或者一个正则。 替换值可以是一个字符串或者是一个每次匹配都要调用的函数。**

> 注意这里 着重介绍正则替换。  而且要非常注意是每一次匹配都要调用的函数。 所以就是说 每一次匹配到的结果会暂时返回到回调函数的第一个参数。 接着会再次匹配正则。直到匹配到没有为止。

### 语法

> str.replace(regexp|substr, newStr|function);

### 参数

- regexp 一个RegExp对象或其字面量。该正则所匹配的内容会被第二个参数的返回值替换掉​
- substr 一个要被newStr 替换掉的字符串。 它是一个字符串。不是一个正则。 而且仅仅第一个匹配会被替换

- newStr 用来替换第一个参数原字符串所匹配到的部分字符串。 

- function(replacement) 一个用来创建新子字符串的函数 该函数的返回值将替换掉第一个参数匹配到的结果

  **当匹配执行后。 该函数就会执行。函数的返回值作为替换字符串。注意 如果第一个参数是正则。 且为全局匹配模式 那么这个方法就会被调用多次。每次匹配都会被调用**

  - match 匹配函数的第一个参数 匹配到的子字符串 

  - p1, p2  表示的是第n个括号匹配的字符串 如果没有括号 就返回后面的参数 offset字符串的偏移量 和 string 匹配的原字符串。

    ```javascript
    String.prototype.firstUpperCase = function() {
        // 匹配开头 字符 转换为大写
      	return this.replace(/^\w/, function(s, p1, p2){
            return s.toUpperCase();
        });
    }
    
    'abc'.firstUpperCase(); //   'a' 0 'abc' 匹配到的子字符 偏移量 和 原字符
    // 最终返回的结果是 Abc
    
    // 第二个例子是有括号的正则匹配
    String.prototype.camzlie = function(str){
        return str.replace(/-(\w)?/g, function(match, p1, offset){
            return offset ? p1.toUpperCase() : '';
        })
    }
    
    'background-color'  backgroundColor
    ```

* searh  执行正则表达式和String对象之间的一个搜索匹配

  str.search(reg);

  reg 一个正则表达式 如果传一个非正则表达式 会隐式转为正则。



  **返回值** 如果匹配成功 返回正则表达式在字符串中首次匹配项的索引 否则 返回-1

**类似于indexOf 返回匹配元素的起始位置。如果没有返回-1。不支持修饰符g。**

```javascript
let txt = 'syolmm@126.com';
const REG = /\d+/;

console.log(txt.search(REG)); // 7
```





