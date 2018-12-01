/**
 * 首字母大写
 */

String.prototype.firstUpperCase = function() {
    // 匹配开头 非空白的字符
    return this.replace(/^\S/, function(s) {
        return s.toUpperCase();
    });
}

/**
 * background-color 驼峰命名法
 */

function camelize(str) {
    return str.replace(/-(\w)?/g, function(match, chr) {
        return chr ? chr.toUpperCase() : '';
    });
}

/**
 * 获取url指定参数值
 * ["?name=lisi"]
 */

function getParamName(attr) {
    let match = RegExp(`[?&${attr}=(^&]*)`).exec(window.location.search); // 分组运算符把结果存在exec 函数返回的结果里

    // url中的+表示空格 要替换掉
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

// getParamName('name') list


// 数字格式化问题，1234567890 --> 1,234,567,890
function formatCash(str) {
    return str.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

console.log(formatCash('12345678')); // 123,456,78

/**
 * 1 /\B(?=(\d{3})+(?!\d))/g：正则匹配边界\B，边界后面必须跟着(\d{3})+(?!\d);
 * 2 (\d{3})+：必须是1个或多个的3个连续数字;
 * 3 (?!\d)：第2步中的3个数字不允许后面跟着数字;
 * 4 (\d{3})+(?!\d)：所以匹配的边界后面必须跟着3*n（n>=1）的数字。
 */

 

 // 5 去除字符串左右两边的空格

function tirm(str){
    return str.replace(/(^\s*)|(\s*$)/g, '');
}

tirm('  I love you  '); // I love you


