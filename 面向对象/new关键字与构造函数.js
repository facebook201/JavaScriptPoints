
### 一 构造函数
	专门用来生成 "对象" 的函数。它提供模板 描述对象的基本结构。一个构造函数
可以生成多个对象 这些对象都有相同的结构。有两个特点

var Vehicle = function(){
	this.price = 1000;
};
var v = new Vehicle();
v.price;	// 1000


* 函数体内部使用this关键字 代表所要生成的对象实例。
* 生成对象的时候必须用new命令 调用Vehicle函数。	


### 二  new 命令

new 命令就是执行构造函数 返回一个实例对象。构造函数也可以接受参数

var Vehicle = function(p){
	this.price = p;
};
var v = new Vehicle(500);

如果不使用 new 命令。那么函数就是一个普通的函数调用。并不会生成实例对象。
this执向全局对象。将会造成意向不到的结果。所以我们创建构造函数的时候。
最好在构造函数内部判断是否使用 new 命令。如果没有 就返回一个实例对象

function Fubar(foo, bar){
	if(!(this instanceof Fubar)){
		return new Fubar(foo, bar);
	}
	this.foo = foo;
	this.bar = bar;
}

Fubar(1, 2).foo;		// 1
(new Fubar(1,2)).foo;	// 1


### 三 new 命令的基本原理

var res = new A();

A：创建一个新对象X 作为将要返回对象的实例
B：判断A.prototype是不是object
C：如果是object, 则执行 X.__proto__ = A.prototype;
D：如果不是 则执行X.__proto__ = Object.prototype;
E：执行 result = A.call(X);
F：将空对象赋值给函数内部的this关键字。
G：开始执行构造函数内部的代码


如果构造函数内部有 return 语句。而且 return 后面跟着一个对象 new命令会返回这个对象。
否则就会不管return语句 返回 this 对象。