
## 1 let 和 const;

DTZ 指的是变量被声明和被初始化之间的这段时间。
var x = 1;
;(function(){
    console.log(x);	//ReferenceError
    let x = 2;
})();

上面代码如果let不发生变量提升，那么就会输出1.但是结果报错。
原因在于 var发生变量声明的时候 给其初始化值是undefined。但是let变量声明之后会
保持未初始化值( uninitialised )。

function foo(a = b, b){
    console.log(a);
}
foo(undefined, 1);

function foo1(x, y = x){
    console.log(x);
}
foo1(1, undefined);

这里参数a想得到参数b的值。但是参数b没有初始化。所以会报错。
=======================================================================================
二> const

const 定义的是 "不可重新赋值" 的值。  与 不可变的值不同;
const 定义的Object。在定义之后仍可以修改属性。
包括常量 配置项 以及引用的组件。 定义的 "大部分" 中间变量等。

========================================================================================
三>   Template Strings (字符串模板)

实例应用：

const start = 'hi all';
const getName = () => {
    return 'jey';
};
const conf = {
    fav: 'Coding'
};

//模板
const msg = `${start}, my name is ${getName()}, ${conf.fav} is my favourite`;

但是你可能不知道的：

// 1 与引号混用
const wantToSay = `I'm a "boy"`;

// 2 支持多行文本
const slogan =
`
I have a dream today!
`;

// 3 比较适合写HTML
const resultHTML =
`
    <section>
        <div>...</div>
    </section>
`;
========================================================================================
4> 增强的对象字面量
ES6 里面对对象的字面量设计了很多简写。这些简写不但保留了明确的语义 还减少了我们多余的代码。

const _bookNum = 4;
const basicConfig = {
    level: 5
};

const config = {
    // 直接指定原型对象
    __proto__: basciConfig,

    //属性简写
    _bookNum;

    //方法简写
    getBookNum(){
        return this.name;
    }
};
============================================================================
四) Arrows and Lexical This ( 箭头函数 )

// 箭头函数没有独立的上下文 所以其内部引用 this 对象会直接访问父级。

你可能不知道的事：

* 箭头函数不但没有独立的this 而且没有独立的 arguments。所以如果需要取不定参的时候。要么使用 function
  要么使用 ES6 的另一个 新特性 rest ( ... );

================================================================================

五) Destructuring (解构)
//解构这个特性可以简单解读为分别定义。用于一次定义多个变量, 常常用于分解方法返回对象为多个变量。
//使用过ES6的或多或少接触过这个特性。

var [a, b, c] = [1, 2, 3];

const bookSet = ['UED', 'TB fed', 'Not find'];
const bookCollection = () => {
  return {book1: 'UED', book2: 'TB fed'};
};

// 1. 解构也可以设置默认值
const {book1, book3 = 'Not find'} = bookCollection();

// 2. 解构数组时候是可以跳过其中某几项的
const [book1,,book3] = bookSet;  // book1 = 'UED', book3 = 'Not find'

// 3. 解构可以取到指定对象的任何属性，包括它包含的方法
const {length: setLength} = bookSet;  // setLength = 3
===========================================================================================

六) Rest + Spread 主要是应用 ... 运算符 完成值的聚合和分解。

// 1 rest 得到的是一个真正的数组
const getOptions = function(...args){
    console.log(args.join);     //function
};

// 2 rest 可以配合箭头函数使用 取得所有参数
const getOptions =  (...args) => {
    console.log(args);      //array
};

// 3 spreadd 可以用于解构时 聚合所得的值
const [opt1, ...opts] = ['one', 'two', 'three', 'four'];

// 4.spread 可以用于数组定义
const conf = ['other', ...opts];

=====================================================================

七> Promise 不只是一个对象 一个语法 更是一种异步编程方式的变化

//1 多个异步任务同时执行时 用 Promise.all 顺序执行使用 链式调用
// Promise.all
Promise
  .all([jsBuildPromise, cssBuildPromise])
  .then(() => {
    ...
  });

// chain
jsBuildPromise
  .then(() => cssBuildPromise)
  .then(() => {
    ...
  });


// 2. Promise 的链式调用需要每一个过程返回一个 Promise 对象才能保证顺序执行
gitPromise
  .then(() => git.add())  // 正确，箭头函数简写
  .then(() => {
    git.commit(); // 错误，函数返回 undefined，会立即执行下一过程
  })
  .then(() => {
    return git.log(); // 正确
  });


// 3. Promise 需要调用 catch 方法来捕获错误，而且过程内的错误不会阻塞后续代码执行
new Promise(() => {
  f;  // not define error !
}).catch((err) => {
  console.log(err)  // show 'f is not define'
});
console.log('error test');  // 此行可以被正常执行

============================
Module

export 命令
// 模块功能主要由两个命令构成：export import。export命令用于规定模块的对外接口

// a.js
var firstName = 'Michael';
var lastName  = 'Jackson';
var year      = '1958';
export {firstName, lastName, year};

import 命令 // 使用export命令定义了模块的对外接口后 其他JS文件就可以通过import命令加载
// main.js

import {firstName, lastName, year} from './profile';

function setName(element){
    element.textContent = firstName + " " + lastName;
}
