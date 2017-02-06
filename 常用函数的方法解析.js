// 将字符串转换为驼峰写法


/*
 * replace() 方法使用一个替换值（replacement）替换掉一个匹配模式（pattern）在原字符串中某些或所有的匹配项，
 * 并返回替换后的新的字符串。这个替换模式可以是一个字符串或者一个 RegExp，替换值可以是一个字符串或者一个函数。
 * 语法。
 * 这里第二个参数是回调函数，回调函数有两个参数，第一个参数是匹配模式值
 */

camelize('shi-yao').replace();  // shiYao 'background-color' == "backgroundColor"

function camelize(str){
  return str.replace('/-(\w)/g', function(strMatch, p1){
    console.log(strMatch);  // -y
    console.log(p1);        // y
    return p1.toUpperCase();
  });
}
