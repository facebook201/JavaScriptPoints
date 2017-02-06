/*
 * 闭包的应用场景 常用来实现对象数据的私有
 * 定义：由函数引用其周边状态(词法环境)绑定在一起形成的组合结构
 * 作用  可以在一个函数内部访问其外部函数的作用域。要使用闭包 只需要简单地将一个函数定义在另一个函数内部。
 *       并将它暴露出来。可以返回 也可以传给其他函数。内部函数可以访问外部函数的变量 即使函数执行完毕。
 *
 * 1) 事件处理 回调函数
 * 2) 偏函数应用 柯里化
 */

// 实现数据的私有机制
const getSecret = function(secret){
  return {
    get: function(){
      return secret;
    };
  };
};


// 偏函数： 一个过程 它传给某个函数其中一部分参数。然后返回一个新的函数。该函数等待接收后续参数。换句话说
// 偏函数应用是一个函数。他接受另一个函数作为参数。这个作为参数的函数本身接受多个参数 它返回一个函数。
// 这个函数与它的参数函数相比 接受更少的参数。偏函数应用提前赋予一部分参数 而返回的函数则等等调用时传入剩余的参数


作为将函数当做返回值输出的典型应用就是偏函数。 创建一个调用另外一部分——参数或变量已经预置的函数。

// 1 类型判断
var isType = function(type){
  retrun function(obj){
    return {}.toString.call(obj) === "[object " + type +"]";
  }
}

通过指定部分参数来返回一个新的定制函数的形式就是偏函数。


// 函数柯里化
// 把接受多个参数的函数变成接受一个单一参数的函数，如果其他的参数是必要的 返回接受余下的参数且返回结果的新函数

const greet = function(greeting, name){
  return greeting + ' ' + name;
};

// 柯里化
const greet = function(greeting){
  return function(name){
    return greeting + name;
  };
};

greet("Hello")("lisi");

var greetHello = greet("Hello");
greetHello("zhangsan");
greetHello("lisi");
//这样就 可以接受任何问候语参数 并且返回一个我们想要的名字作为参数





// 可以看到这样的方法多么强大 但是复杂的定制化函数。要保证嵌套的返回子函数，
// 并且调用他们的时候需要多组圆括号。每个都包含一个自己的独立的参数

var curryIt = function(uncurried){
  var parameters = Array.prototype.slice.call(arguments, 1);
  return function(){
    return uncurried.apply(this, parameters.concat(
      Array.prototype.slice.call(arguments, 0);
    ));
  };
};

// 为了使用这种方式 我们传入带有任意个参数的函数名字

var greeter = function(greeting, separator, emphasis, name){
  console.log(greeting + separator + name + emphasis);
};
var greetHello = curryIt(greeter, 'hello', ', ', ".");
greetHello("shiyao");     //  "hello, shiyao."
