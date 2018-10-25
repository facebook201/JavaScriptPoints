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



















