/** forEach 对数组的每个元素执行一次提供的函数。forEach 为每个数组元素执行callback函数; 不像map reduce。总是返回undefined
 *  并且不可链式调用。且没有办法终止循环 除了抛出异常。如果要测试数组里面的一个元素是否符合条件 可以使用every 或 some
 *
 *  arr.forEach(callback(currentValue, index, array) {
 *    // do Something
 *  }, this);
 *  返回值 : undefined
 *
 *  @param { callback 执行的回调函数 }
 *  @param { currentValue 数组当前的元素 }
 *  @param { index 数组中正在处理当前元素的索引 }
 *  @param { array forEach 正在操作的数组 }
 **/


let arr = [1, 2, 3, 4];

arr.forEach(function(ele) {
    console.log(ele); // a b c
});

// 这是一个 ES5的方法 所以 不支持IE9以下 下面是一个 Polyfill

if (!Array.prototype.forEach) {
    // 在数组的原型上扩展forEach方法 一个回调函数 一个this
    Array.prototype.forEach = function(callback, thisArg) {
        var k, T;

        // 判断是不是数组是否未定义或null 抛出异常
        if (this === null) {
            throw new TypeError(' this is null or is not defined');
        }

        // 让数组调用Object 返回一个对象
        var O = Object(this);

        // 缓存length属性
        var len = O.length >>> 0;

        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
        }

        // 如果提供了thisArg 就赋给T 否则就传一个undefined
        if (arguments.length > 1) {
            T = thisArg;
        }

        k = 0;

        while (k < len) {
            // 初始化一个变量存储数组的元素 k 是索引 O是数组 kValue是元素值
            var kValue;
            // 如果指定的属性在指定的对象中 in运算符就会返回true
            if (k in O) {
                kValue = O[k];
                callback.call(T, kValue, k, O);
            }
            k++;
        }
    };
}

// =================================================================================

/**
 *  every 测试数组的所有元素是否都通过了指定函数的测试 只要有一个元素没有通过测试 就立即返回false 如果
 *  全部通过就返回true。 且 every 不会改变原数组。
 ***/

// result is false
var result = [12, 6, 130, 44].every(function(ele) {
    return ele >= 10;
});

// this is true
var result = [12, 16, 130, 44].every(function(ele) {
    return ele >= 10;
});


// Polyfill

ArrayPro.every = function(callback, thisArg) {
    // 判断 数组是否定义
    if (this === void 0 || this === null) {
        throw new TypeError();
    }

    var t = Object(this);

    var len = t.length >>> 0;

    if (typeof callback !== 'function') {
        throw new TypeError();
    }

    // 保存第二个参数 如果有就传定义的this 否则就传undefined
    var thisArg = arguments.length > 1 ? arguments[1] : void 0;

    for (var i = 0; i < len; i++) {
        if (i in t && !callback.call(thisArg, t[i], i, t)) {
            return false;
        }
    }
    return true;
}


// =============================================================================

/**
 * filter 方法会返回一个新数组。里面的元素是通过提供函数实现的测试的所有元素
 * filter 不会改变原数组
 */

var result = [10, 20, 22, 30].filter(function(ele) {
    return ele > 25;
});

// [30]

ArrayPro.filter = function(callback, thisArg) {
    if (this === void 0 || this === null) {
        throw new TypeError('this is undefined');
    }

    var arg, len, k;

    var O = Object(this);
    len = O.length >>> 0;
    arg = arguments.length > 1 ? arguments[1] : void 0;

    k = 0;

    var result = [];
    while (k < len) {
        var kValue;
        if (k in O) {
            kValue = O[k];
            if (callback.call(arg, kValue, k, O)) {
                result[result.length] = kValue;
            }
        }
        k++;
    }
    return result;
}

// =====================================================================================

// map  返回一个新数组。 结果是该数组中每个元素都调用一个提供的函数后返回的结果
var number = [1, 2, 3, 4].map(function(ele, index) {
    return ele * 2;
});

// [2, 4, 6, 8]

ArrayPro.map = function(callback, thisArg) {
    if (this === void 0 || this === null) {
        throw new TypeError('this is undefined');
    }

    var arg, len, k;

    var O = Object(this);
    len = O.length >>> 0;
    arg = arguments.length > 1 ? arguments[1] : void 0;

    k = 0;

    // 最终要返回的数组
    var result = new Array(len);
    var mapValue;

    while (k < len) {
        var kValue;
        if (k in O) {
            kValue = O[k];

            mapValue = callback.call(arg, kValue, k, O);
            // 将返回值赋给数组
            result[k] = mapValue;
        }
        k++;
    }
    // 返回新数组
    return result;
}


// ===========================================================================

/**
 * reduce(callback, initialValue) 方法对累加器和数组中的每个元素 应用一个函数。 将其减少为单个值。
 * @param {callback 执行数组中每个值得函数 包含四个参数} 
 * @param {accumulator 累加器累加回调的返回值; 它是上一次调用回调时的累积值 或者初始的initialValue } 
 * @param {currentValue 数组中正在处理的数组元素 从第一个开始 }
 * @param {currentIndex 数组中正在处理的元素索引 如果提供了initialValue 索引则为0，否则就是1， 其实也就是没有提供initiaValue。直接就从第一项开始计算}
 * @param {initialValue 可选 callback的第一个参数的值。如果没有提供初始值 则将使用数组中的第一个元素。}
 */


// 常用场景一 累积计算

var total = [0, 1, 2, 3, 4].reduce(function(sum, ele, index, arr) {
    return sum + ele;
}, 0); // total is 10


// 场景二 数组扁平化 二维或多维数组转换为一维

function flatten(arr) {
    return arr.reduce(function(sum, ele, index, arr) {
        // 判断元素是否是数组
        return sum.concat(Array.isArray(ele) ? flatten(ele) : ele);
    }, []);
}

// 计算数组每个元素出现的次数

Array.prototype.countArrTimes = function() {
    return this.reduce(function(sum, ele, index, arr) {
        if (ele in sum) {
            sum[ele]++;
        } else {
            sum[ele] = 1;
        }
        return sum;
    }, {});
}