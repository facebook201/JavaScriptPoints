
js属性分为两种类型：数据属性和访问器属性。属性特征的特性

[[Configurable]]            // true or false
[[Writable]]                // true or false
[[Enumerable]]              // true or false
[[Value]]                   // everything
[[set]]                     // function or undefined
[[get]]                     // function or undefined


谈define

数据属性和访问器属性都拥有特性, 要想修改属性的特性。必须通过两个Object方法。
即 Object.defineProperty 和 Object.defineProperties。都是用来定义属性的,前者只能定义一个属性,
后者可以定义多个。

=============================
defineProperty
=============================
* defineProperty(obj, prop, descriptor)
    obj:        将要被添加属性或修改属性的对象。
    prop:       对象的属性
    descriptor: 对象属性的特征

var person = {};
Object.defineProperty(person, birth, {
    Writable: false,
    value: 1995
});         // 定义一个不可写 值为 1995的新属性

注意: "使用definedProperty方法定义新属性时, 如果不指定,"
"Configurable, enumerable和writable特性的默认值都是false。"

Object.definedProperty(person, birth, {
    configurable: false;
    enumerable: false;
    writable: false;
    value: 1995
});

=============================
defineProperties 定义多个属性
=============================
Object.defineProperties(person, birth,{
    "property1": {
        value: true,
        writable: true
    },
    "property2": {
        value: "hello",
        writable: false
    }
});

### 数据属性
数据属性包含一个数值的位置。在这个位置可以读取和写入值。数据属性拥有4个特性
* Configurable: 表示能否通过delete删除属性。能否修改属性的特性 能否把属性修改为访问器属性。默认值： true。
* Enumerable: 表示能否 for in。 Object.keys()迭代。默认值 true;
* Writable: 表示能否修改属性的值。 默认值: true;
* Value: 表示属性的数据值 默认值: undefined。

### 访问器属性
访问器不包含数据值，他们包含一对getter和setter函数.
* 在读取访问器属性时。会调用 getter()
* 写入访问器属性的时, 会调用setter()\
访问器属性不能直接定义, 需要使用后面提到的Object.defineProperty 函数定义。访问器属性也有4个特性。

Configurable: 同数据属性
Enumerable: 同数据属性
Get: 在读取属性时调用的函数。 默认值 undefined
Set: 在写入属性时调用的函数 默认值 undefined

var person = {
    birth: 1995,
    age: 21
};
Object.defineProperty(person, 'year', {
    get: function(){
        return this.birth + this.age;
    },
    set: function(newValue){
        this.age = newValue - this.birth;
    }
});

" getter 和 setter 都是可选的。在非严格模式下只能指定了getter却进行了写入操作。写入的值会被忽略。"
