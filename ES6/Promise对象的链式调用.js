
Promise 对象的链式调用
// Promise 对象下调用then方法可以把异步排个顺序

const test = {
    function func1(){
        var data = new Promise( (resolve) => {
            setTimeout(function(){
                resolve("ajax结果111");
            }, 200);
        });
        return data;
    },

    function func2(){
        var data = new Promise( (resolve) => {
            setTimeout(function(){
                resolve("ajax结果222");
            },100);
        });
        return data;
    },
    function func3(){
        var data = new Promise((resolve) => {
            setTimeout(function(){
                resolve("ajax结果333");
            }, 500);
        });
        return data;
    }
};

// 假设三个方法 三个ajax 然后

test.func1().then(function(value){
    console.log(value);
    // doSomething...
});


// 如果三个ajax 顺序执行 你可能这样写

test.func1().then(function(value){
    console.log(value);
    test.func2().then(function(value){
        console.log(value);
        test.func3(funciton(value){
            console.log(value);
        });
    });
});

// 但是上面的代码依然也是嵌套很深 所以 我们使用链式调用的方法来写 只要return当前的值

test.func1().then(function(value){
    console.log(value);
    return test.func2();
}).then(function(value){
    console.log(value);
    return test.func3();
}).then(function(value){
    console.log(value);
});
