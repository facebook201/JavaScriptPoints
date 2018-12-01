/**
 * 1 Set 是ES6新增的 new Set(); Array.form() 都可以去重
 * Set 类似于数组的。但是成员值都是唯一的 没有重复的值
 * 可以看出 Set是一个构造函数 通过new的方式来生成。
 * Array.form() 也是可以将Array-like 转换成一个真正的数组
 */

var set = new Set([1, 2, 3, 4, 'a', 'a', '1']);
var arr = [...set]; // 这样就转换为一个数组 扩展运算符
typeof set; // object


/**
 * 数组去重
 */

// Array.form() 和 Set

Array.prototype.unique = function(){
  return Array.form(new Set(this));
}

// filter 返回一个通过函数组成的新数组

Array.prototype.unique = function(){
  var newArr = this.sort();
  return newArr.filter(function(ele, index){  
    return ele !== newArr[index + 1];
  });
}

// 




