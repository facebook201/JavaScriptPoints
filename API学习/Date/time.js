;
(function() {
    'use strict';

    var date = new Date(); // 返回当前时间的字符串形式 Fir Aug 21 2017 11:11:11 GMT+0800 (中国标准时间)

    var dateNumber = date.getTime(); // javascript内置时间 返回的是毫秒数 UTC是秒数

    var num = 0;
    for (let i = 0; i < 100000000; i++) {
        num += i;
    }

    var bettewn = new Date().getTime() - dateNumber; // 循环一千万次执行109毫秒


    // ISO 8601 标准时间
    var isoTime = '2017-12-22T08:00:00Z'; // 表示UTC标准时间 就是零时区的 而我们是东八区的 所以 我们就是 16时

    var bjTime = new Date(isoTime); // Fri Dec 22 2017 16:00:00 GMT+0800 (CST)


    // 常用的时间格式化
    if (!Date.prototype.format) {
        Date.prototype.format = function(fmt) {
            var o = {
                'M+': this.getMonth() + 1, // 月份
                'd+': this.getDate(), // 天
                'h+': this.getHours(), // 小时
                'm+': this.getMinutes(), // 分
                's+': this.getSeconds(), // 秒
                'q+': ~~((this.getMonth() + 3) / 3), // 季度
                'S': this.getMilliseconds() // 毫秒 
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

    function transTime(time, type) {
        if (time.indexOf('Z') === -1) {
            time += 'Z';
        }
        return new Date(time).format(type);
    }
    var time = '2017-12-22T08:00:00';

    console.log(transTime(time, 'yyyy-MM-dd hh:mm:ss'));

}());