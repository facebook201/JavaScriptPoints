// 扩展运算符(Spread Operator) ...arg 的6个用途

//1 不使用apply去调用参数
function passArg(x, y, z){
    console.log(arguments);
}
// 调用函数 传递参数
passArg.apply(null, args);
// 扩展运算符
passArg(...args);


//2 合并数组
arr1.push(...arg2);        // 把arr2合并到arr1后面
arr1.unshift(...arg2);     // 把 arr2 合并到 arr1前面

// 数组内合并数组

var arr1 = ['two', 'three'];
var arr2 = ['one', ...arr1, 'four', 'five'];

// 3复制数组
var arr = [1, 2, 3];
var arr2 = [...arr];    // [1, 2, 3] 就像 arr.slice();
arr2.push(4);
// 不过数组仍然是通过指针得到 所以我们并没有复制数组本身。我们复制的只是一个新的指针。

//4 把arguments 或 NodeList 转为数组.以前我们使用 Array.prototype.slice 去把NodeList
//  arguments转为真正的数组。但是现在我们可以使用扩展运算符这么做

var myFn = function(...args){
    // args等同于 [...arguments]
    // Array.from(args) 也可以 转换两类对象 (array-like-object 和 iterable)
}

// 5 使用Math函数
lst numbers = [9,8,1,2,0];
Math.min(...numbers);

//6 结构赋值s

let {x, y, ...z} = {x: 1, y: 2, a: 3, b: 4};
console.log(x);     // 1
console.log(y);     // 2
console.log(z);     // {a: 3, b: 4}
