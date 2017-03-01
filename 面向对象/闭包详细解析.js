/*
闭包就是由函数创造的一个词法作用域，
里面创建的变量被引用后，可以在这个词法环境之外自由使用。
闭包通常用来创建内部变量，使得这些变量不能被外部随意修改，
同时又可以通过指定的函数接口来操作。
*/

//1 JavaScript作用域只有函数作用域和全局作用域

/**
 * 垃圾回收机制：当一个值 在内存中失去引用的时候。垃圾回收机制会根据一个特殊的算法找到它 并将其回收 释放内存
 */
/**
 * 2 作用域和执行上下文
 * JavaScript代码的整个执行过程。分为两个阶段 代码编译阶段和代码执行阶段。编译阶段由编译器完成。将代码
 * 翻译成计算机可执行的代码。作用域会在这个时候确定，执行阶段由引擎完成 主要任务是执行可执行的代码，执行
 * 上下文在这个阶段创建
 * 作用域链： " 是由当前环境与上层环境的一系列变量对象组成，它保证了当前执行环境对符合访问权限的变量和函数
 *  					 的有序访问。"
 *
 * 闭包：当一个函数可以记住并访问所在作用域，并在定义该函数的作用域之外执行时。该函数可以称之为一个闭包。
 * 闭包的两个特点：
 * 							A: 可以读取函数内部的变量。
 * 							B: 让这些变量的值始终保存在内存中。
 * 值得注意的是，在闭包中。能访问到的变量 仍然是作用域链上能够查询到的变量。
 */

var fn = null;
function foo(){
  var a = 2;
  function innerFoo(){
    console.log(c);     // 在这里 视图访问函数bar中的c变量 会抛出错误
    console.log(a);
  }
  fn = innerFoo;      // 将innerFoo的引用 赋值给全局变量中的fn
}

function bar(){
  var c = 100;
  fn(); // 此处保留innerFoo的引用
}
// 另一种闭包 难以发现

function test(){
  function bar(str){
    console.log(str);
  }
  function foo(fn, string){
    fn(string);
  }
  foo(bar, 'this is closure');
}
test();

/**
 * 函数bar 在函数test的作用域中定义。然后被作为参数传入了函数foo中并在foo的作用域
 * 中被执行。根据定义 我们很容易知道函数 bar就是一个闭包。这就是我们常常说的回调函数
 * 下面我们看看闭包的常用场景
 */

// 延迟函数 setTimeout
function fn(){
  console.log('this is test');
}

var timer = setTimeout(fn, 1000);
console.log(timer);

// 柯里化 回调 模块

(function(){
  var a = 10;
  var b = 20;
  function add(num1, num2){
    var num1 = !!num1 ? num1 : a;
    var num2 = !!num2 ? num2 : b;
    return num1 + num2;
  }
  window.add = add;
})();


for(var i = 1; i < 5; i++){
  setTimeout(function timer(){
    console.log(i);
  }, i * 1000);
}

for(var i = 1; i < 5; i++){
  (function(i){
    setTimeout(function timer(){
      console.log(i);
    }i * 1000);
  })(i);
}
