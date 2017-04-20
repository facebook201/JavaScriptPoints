
// 代码示例

function getSomething(){
    var r = 0;
    setTimeout(function(){
        r = 2;
    }, 10);
    return r;
}
function compute(){
    var x = getSomething();
    console.log(x);
}
compute();  // 0

/* 因为这是异步问题。在返回r之前 r 还没有执行 r = 2;
 */

// 回调函数
function getSomething(cb){
    var r = 0;
    setTimeout(function(){
        r = 2;
        cb(r);
    }, 10)
}
function compute(x){
    console.log(x * 2);
}
getSomething(compute);


// 回调函数可以解决 异步问题。一般遇到异步就传函数。 但是 Promise是专门用来解决回调函数引起的问题

function getSomething(){
    var r = 0;
    return new Promise(function(resolve){
        setTimeout(function(){
            r = 2;
            resolve(r);
        }, 10);
    });
}

function compute(x){
    console.log(x*2);
}

getSomething().then(compute);

// generator

function getSomething(){
    var r = 0;
    setTimeout(function(){
        r = 2;
        it.next(r);
    }, 10);
}

function *compute(it){
    var x = yield getSomething();
    console.log(x * 2);
}

var it = compute();
it.next();

// 这里 yield 表示终止 getSomething() 函数。
// 而调用next() 表示重新执行方法 这里的next() 就是 getSomething();

function getSomething() {
	var r = 0;
	return new Promise(function(resolve) {
		setTimeout(function() {
			r = 2;
			resolve(r);
		}, 10);
	});
}

async function compute() {
	var x = await getSomething();
	alert(x * 2);
}
compute();
