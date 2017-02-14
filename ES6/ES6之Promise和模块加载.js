
// Promise 就是一个对象。用来传递异步操作的消息。它代表某个未来才知道的事件。( 通常是一个异步操作 )
// 并且这个事件提供统一操作的API 可以供进一步处理

Promise 对象有两个特点

//A)  对象的状态不受外界影响 Promise对象代表一个异步操作。
//    有三种状态：Pending 进行中。Resolved 已完成又称Fulfilled 和 Rejected 已失败
//    只有异步操作的结果可以决定当前是哪一种状态。任何其他操作都无法改变这个状态。

/*B)  一旦状态改变 就不会变，任何时候都可以得到这个结果。Promise对象的状态改变 只有两种可能:
 *    从Pending变为Resolved。 从Pending 变为 Rejected。只要这两种情况发生 状态就凝固不会再变。
 */

Promise 也有一些缺点。
//首先，无法取消Promise，一旦新建它就会立即执行，无法中途取消。
//其次，如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。
//第三，当处于Pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

//基本用法
var promise = new Promise( (resolve, reject) => {
    // some code
    if(/*异步成功*/){
        resolve(value);
    }else{
        reject(error);
    }
});


// Promise 构造函数接受一个函数作为参数 该函数的两个参数分别是 resolved 和 reject。
// resolve 函数的作用是 将 Promise 对象的状态从 "未完成" 变为 "成功"
// reject  将对象的状态从 "未完成" 变为 "失败"。在异步操作失败时调用。并将操作异步操作报出的错误 作为参数传递出去

// Promise实例生成以后 可以使用then方法分别制定 Resolved 和 reject 状态的函数
promise.then( (value) => {
    //success
}, (value) => {
    //failure
});

// then方法可以接受两个回调函数作为参数。
// 第一个回调函数是Promise对象的状态变为Resolved时调用。
// 第二个回调函数是 Promise对象的状态 变为 reject

function timeout(ms){
    return new Promise((resole, reject) => {
        setTimeout(resolve, ms, 'done');
    });
}

timeout(100).then( (value) => {
    console.log(value);
});


Promise.prototype.then() // 为Promise实例添加状态改变时的回调函数。
// then方法返回的是一个新的实例 不是以前的那个实例。所以可以采用链式调用在加then方法。

getJSON("/post/1.json").then(function(post){
    return getJSON(post.commentURL);
}).then(function funcA(comments){
    console.log("Resolved: ", comments);
}, function funcB(err){
    console.log("Rejected: ", err);
});

getJSON("/post/1.json").then( (post) => {
    return getJSON(post.commentURL);
}).then(
    comments => console.log("Resolved: ", comments),
    err => console.log("Rejected: ", err);
);

// 第一个then方法指定的回调函数，返回的是另一个Promise对象。
// 这时，第二个then方法指定的回调函数，就会等待这个新的Promise对象状态发生变化 。
// 如果变为Resolved，就调用funcA，如果状态变为Rejected，就调用funcB。


Promise.prototype.catch() 用于指定发生错误时的回调

getJSON('/post/1.json').then(function(post){
    //
}).then(function(comments){
    //
}).catch(function(error){
    //处理前面三个Promise产生的错误
});

// 一般来说，不要在then方法里面定义Reject状态的回调函数（即then的第二个参数），总是使用catch方法。
// 跟传统的try/catch代码块不同的是，如果没有使用catch方法指定错误处理的回调函数，
// Promise对象抛出的错误不会传递到外层代码，即不会有任何反应。所以一定要使用 catch 函数。
// 需要注意的是，catch方法返回的还是一个Promise对象，因此后面还可以接着调用then方法。

Promise.all();

var p = Promise.all([p1, p2, p3]);

//Promise.all方法接受一个数组作为参数，p1、p2、p3都是Promise对象的实例，如果不是，
//就会先调用下面讲到的Promise.resolve方法，将参数转为Promise实例，再进一步处理

// p的状态由p1、p2、p3决定，分成两种情况。
// (1)只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。
// (2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。

========================================================================
异步编程

在ES6 之前。JavaScript的异步编程都跳不出回调函数这个方式。 回调函数方式使用非常简单。
但是在复杂的异步任务场景中 就显得力不从心。最主要的问题就是多层回调函数的嵌套难以维护;
ES6 的两个新特性来解决异步编程的难题

// 一个简单的多层嵌套回调函数的例子 (Node.js)

const git = require('shell').git;
const commitMsg = '...';

git.add('pattern/for/some/files/*', (err) => {
    if(!err){
        git.commit(commitMsg, (err) => {
            if(!err){
                git.push(pushOption);
            }else{
                console.log(err);
            }
        });
    }else{
        console.log(err);
    }
});

    Promise
// 本质还是回调函数
// 区分成功和失败的回调，省去嵌套在内层的判断逻辑
// 可以很轻松的完成回调函数模式到 Promise 模式的转化
// 代码由回调函数嵌套的横向扩展，变为链式调用的纵向扩展，易于理解和维护


const git = require('shell').git;
const commitMsg = '...';

git.add('pattern/for/some/files/*')
    .then( () => git.commit(commitMsg))
    .then(git.push)
    .catch( (err) => {
        console.log(err);
    });


Generator ES6新特性

* 可以通过yield关键字 终止执行并返回 (内到外)
* 可以通过next(val) 方法调用重新唤醒 继续执行 (外到内)
* 运行时 (包括挂起态) 共享局部变量
* Generator 执行会返回一个结果对象 结果对象本身既是迭代器 同时也是可迭代对象 所以 Generator 可以直接用于 自定义对象迭代器

Generator 也是 JavaScript 对 协程（coroutine）的实现，协程可以理解为 “可由开发人员控制调度的多线程”

* 协程按照调度机制来区分，可以分为对称式和非对称式
* 非对称式：被调用者（协程）挂起时，必须将控制权返还调用者（协程）
* 对称式：被调用者（协程）挂起时，可将控制权转给 “任意” 其他协程
* JavaScript 实现的是 非对称式协程（semi-coroutine）；非对称式协程相比于对称式协程，代码逻辑更清晰，易于理解和维护
