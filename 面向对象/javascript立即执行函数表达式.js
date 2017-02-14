
(function(window, undefined){
  //
  // 代码
})(window);

/**
 * 1 用括号把 function(){} 框起来。是为了将其转成可执行的表达式
 * 2 为什么特殊形参 undefined. 因为实参只有两个 但是形参有三个 所以形参undefined会
 * 默认赋值为undefined。防止特殊值 undefined被恶意代码篡改。可以压缩代码
 *
 */

// 写法解析 普通写法

var wall = {};

(funciton(window, WALL, undefined){
  // 给wall命名空间绑定say方法
  WALL.say = function(){
    console.log('hello');
  };
})(window, wall);
wall.say()


// 放大模式
var wall = (function(window, WALL, undefined){
  if(typeof WALL == 'undefined'){
    WALL = {};
  }
  // 给wall命名空间绑定方法say
  WALL.say = function(){
    console.log('hello');
  }
  return WALL;
})(window, wall);

// 放大模式的好处就是 可以不用考虑代码加载的先后顺序。因为js允许wall变量进行重复var声明。所以这段代码
// 是可以执行的。


// 宽放大模式
;(funciton(window, WALL, undefined){
  WAll.say = function(){
    //
  }
})(window, window.wall || (window.wall = {}));
