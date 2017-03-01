/**
 * bind实现了什么
 * A bind用于绑定this的指向。
 * B bind方法会创建一个新函数 当这个函数被调用的时候，bind的第一个参数会
 *  作为运行时的this，之后的参数会在传递的实参前传入作为它的参数。
 * C bind返回的绑定函数也能使用new操作符创建。这样会把原函数当成构造器，
 *   this会被忽略。
 */


Function.prototype.bind = Function.prototype.bind || function (context){
	if (typeof this != 'function'){
		throw new TypeError("Function.prototype.bind");
	}
	var me = this;
	// 先保存第一部分的参数
	var args = Array.prototype.slice.call(arguments, 1);
	return function(){
		var innerArgs = Array.prototype.slice.call(arguments);
		var finalArgs = args.concat(innerArgs);
		return me.apply(context, finalArgs);	
	}
}












