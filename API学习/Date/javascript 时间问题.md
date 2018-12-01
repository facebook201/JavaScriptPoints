
### javascript DateTime

> 标准时间
> GMT(格林威治标准时间) 位于英国伦敦郊区的标准时间。 现在UTC才是世界标准时间。


#### 时间戳
Unix时间戳表示当前时间到1970年1月1日00:00:00 UTC对应的秒数。 但是javascript内置的时间戳是毫秒数。

```javascript

    var date = new Date(); // 返回当前时间的字符串形式 Fir Aug 21 2017 11:11:11 GMT+0800 (中国标准时间)
    var dateNumber = date.getTime(); // javascript内置时间 返回的是毫秒数 UTC是秒数
    var num = 0;
    for (let i = 0; i < 100000000; i++) {
        num += i;
    }
    var bettewn = new Date().getTime() - dateNumber; // 循环一千万次执行109毫秒
```

### ISO 8601 国际标准化组织时间
**YYYY-MM-DDThh:mm:ss + timezone** 类似于 "2017-12-22T08:00:00Z"。Z表示UTC标准时间 即 "00:00"。 
所以这里表示 零时区的2017年12月22号08时。转换成东八区的北京时间就是 2017年12月22号16时。


### 公司格式
公司给我返回的是类似于 '2017-12-22 08:00:00' 或者 '2017-12-22 08:00:00Z' (这种时间格式表示ISO 8601) 

```javascript

// 这里有个大神的代码
   if (!Date.prototype.format) {
      Date.prototype.format = function(fmt) {
          var o = {
              'M+': this.getMonth() + 1,          // 月份
              'd+': this.getDate(),               // 天
              'h+': this.getHours(),              // 小时
              'm+': this.getMinutes(),            // 分
              's+': this.getSeconds(),            // 秒
              'q+': ~~((this.getMonth() + 3) / 3), // 季度
              'S' : this.getMilliseconds()        // 毫秒 
          };
          if (/(y+)/.test(fmt)) {
              fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
          }
          for (var k in o) {
              if (new RegExp("(" + k + ")").test(fmt)) {
                  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
              }
          }
          return fmt;
      }
  }

  /**
   * 1 返回指定时间格式
   */
  var fullTime = new Date().format('yyyy-MM-dd hh:mm:ss');
  var time = new Date().format('yyyy-MM-dd');

  console.log(fullTime)       // '1111-11-11 11:11:11'
  console.log(time);          // '1111-11-11'

  /**
   * 2 将指定的日期装换为 年月日的格式
   */

  var oldTime = (new Date('2010/12/25 20:11:11')).getTime();
  var curTime = new Date(oldTime).format('yyyy-MM-ddd'); // 2012-12-25


  // 单独定义一个函数 来进一步判断是不是UTC时间标准时间
  function transTime(time, type) {
    if (time.indexOf('Z') === -1) {
      time += 'Z';
    }
    // 这里的type表示 你要什么类型 是 yyyy-MM-dd 还是 yyyy-MM-dd hh:ss:mm
    return new Date(time).format(type);
  }

  var time = '2017-12-22T08:00:00';
  console.log(transTime(time, 'yyyy-MM-dd hh:mm:ss'));  // 2017-12-2216:00:00

```
