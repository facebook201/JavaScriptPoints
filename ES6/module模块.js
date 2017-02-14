
//CommonJS 模块
let {stat, exists, readFile } = require('fs');

//等同于
let _fs = require('fs');
let stat = _fs.stat, exists = _fs.exists, readFile = _fs.readFile;

/*
 * 实质上是整体加载fs模块(即加载fs的所有方法) 生成一个对象(_fs),
 * 然后再从这个对象上面读取3个方法。这种加载称为"运行时加载" 只有运行时才能得到
 * 这个对象 导致完全没有办法在编译时做 "静态优化"
 */

//对外部输出三个变量
//profile.js

var firstName = 'Michael';
var lastName  = 'Jackson';
var year      = 1958;
export {firstName, lastName, year};

//输出函数
export function multiply(x, y){
    return x * y;
};

/* 特别注意 export命令规定的是对外接口必须与模块内部变量建立一一对应的关系 */

//写法一
export var m = 1;

//写法二
var m = 1;
export {m};

//写法三
var n = 1;
export {n as m};

//规定了对外的接口 m

//3 import 命令加载export定义的模块

//main.js
//现在mainjs 就可以使用profile模块里面的变量。且暂时只对main可以使用
import {firstName, lastName, year} from './profile';

function setName(element){
    element.textContent = firstName + ' ' + lastNamel;
}
