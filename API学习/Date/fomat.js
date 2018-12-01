
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
