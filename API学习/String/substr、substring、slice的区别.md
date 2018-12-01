### subString、substr、slice



* 他们都是截取字符串 
* 都是两个参数



```javascript
var test = 'hello world';

test.slice(4,7); // o w 返回一个新字符串 不改变原字符串
test.substr(4,7); // o w 第一个参数是起始位置 第二个参数是字符数量 不写就是到末尾 不改变原字符
test.substring(4,7); // o w 返回开始到结束为止的子集 他是以较小参数作为起始位置

```

