
Window.getComputedStyle()
/*
获取所有当前元素所有最终使用的CSS属性值。返回的是一个CSS样式声明对象。
只读。它取到的是所有作用于当前元素上的CSS属性以及属性值。
*/
Syntax

const style = window.getComputedStyle(element[, pseudoElt]);

例如：

var ele = document.getElementById("id").;
var result = getComputedStyle(ele, null);

//这里的 result 返回的就是一个CSS样式声明对象

获取特定属性值

* window.getPropertyValue();    // 可以直接获取CSS样式声明对象上的属性值
getComputedStyle(ele, null).getPropertyValue("color");

* 键值访问
/*
getComputedStyle 和 style 的区别。
getComputedStyle是只读, style能读能写, 而且getComputedStyle返回的整个CSS上面所具有的属性。
而style是只能获取style属性中的CSS样式。
*/

var ele = document.querySelector('p');
getComputedStyle(ele, null).length;     //261 Chrome 每个浏览器不一样
ele.style.length;                       //没有设置就是0 设置几个就是几个

// 总结

element.style;  // 可读可写 但只能获取到自定义style属性

window.getComputedStyle / document.defaultView.getComputedStyle;
// 只读 非IE浏览器以及 IE9+ 获取所有作用样式 使用getPropertyValue来获取特定属性

window.currentStyle
//只读 IE6-8获取所有样式 使用getAttribute 来获取特定属性。
