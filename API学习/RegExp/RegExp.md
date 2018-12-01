###  RegExp 

该构造函数创建一个正则表达式对象 用于将文本与一个模式匹配。 





### 字符类别 

* 点字符 .

    (点号, 小数点) 匹配任意单个字符 但是行结束符之外。 在字符集中 点 失去其特殊含义。 并匹配一个字面点.

    /.y/ 匹配 ‘yes make my day’ 中的 "my" 和 "ay" 但是不匹配 "yes"

* \d 

  匹配任意阿拉伯 0-9

* \D 

  匹配任意一个不是阿拉伯数字字符 ^0-9

* \w

  匹配 任意 字母 数字 下划线 [a-zA-Z0-9_]

* \w

  匹配任意一个不是 字母数字 下划线 ^a-zA-Z0-9_

* \s

  匹配空白字符 包括 空格 制表符 换行符

* \S

  非空白字符



### 边界字符

* ^ 

  匹配开始。 /^A/ 不匹配 "an A" 的A 但是 匹配 "An A"

* $ 

  匹配输入结尾 

* \b  难

  匹配一个零宽单词边界  如一个字母与一个空格之间 但是不要跟[\b] 混淆

  例如 /\bno/ 匹配 "at noon" 里面的 no。 

* \B 难

   匹配一个零宽非单词边界



### 分组  反向引用

* (x) 

  匹配x并捕获匹配项 。例如 /(foo)/ 匹配且捕获"foo bar" 中的 “foo”。被匹配的子字符串可以在结果数组的元素 [1] ....[n] 或在定义的RegExp对象的属性 \$1 ... \$9 

* (?:x)

  匹配 `*x*` 不会捕获匹配项。这被称为非捕获括号（non-capturing parentheses）。匹配项不能够从结果数组的元素 `[1], ..., [n]` 或已被定义的 `RegExp` 对象的属性 `$1, ..., $9` 再次访问到。



### 数量词

* X* 

  匹配前面的模式 x 0 或多次。 

* X+

  匹配X一次或多次

* X?

  匹配X 一次或0次

* X(?=y) 

  只有当x后面紧跟着y时。 才匹配X。 比如a(?=A) 只会匹配a后面有A的a

* X(?!y)

  只有当X后面不是y的时候 才匹配X 

* X|Y

  匹配X 或 Y

* x{n}

  n是一个正整数。前面的模式x连续出现n次时匹配

* x{n,}

  n是一个正整数 前面的模式x连续出现至少n次时匹配

* x{n,m}

  匹配x连续出现n到m次时匹配









### RegExp.prototype.exec

方法在一个指定字符串中执行一个搜索匹配。 返回一个数组或null

* 返回的数组的第一个元素是与整个正则匹配的文本 然后数组的第二个元素是与整个正则的第一个子表达式(**分组**)匹配的文本。 一般来说我们想要的就是第二个元素 第三个元素整个正则的第二个子表达式相匹配的文本 

> 一定要记得是分组匹配的内容 ()

```javascript
var result = /(\d+)-(\w+)/.exec('12-ab');
console.log(result) // --> ["12-ab", "12", "ab", index: 0, input: "12-ab"] 
```



```javascript
function getparamName(attr) {
  // 如果有hash 就使用hash 如果没有hash 就使用search
  let match = RegExp(`[?&]${attr}=([^&]*)`).exec(window.location.search);
  
  return match && decodeURIComponent(match[1].replace(/\+/g, ' ')); // url中+表示空格 替换掉
}

console.log(getparamName('name'));
```



```javascript

var reg = /\d/g,
    result = [],
    crt;

while((crt = reg.exec('a123')) !== null) {
  result = result.concat(crt);
}

result; // [1, 2, 3]
```

