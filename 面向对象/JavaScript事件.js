## JavaScript事件流

### 监听事件

绑定事件: IE attachEvent  W3C addEventListener
解除绑定: IE detachEvent  W3C removerEventListener

var EventUtil = {
  addHandler: function(elem, type, handler) {
    // W3C
    if (elem.addEventListener) {
      elem.addEventListener(type, handler, false);
    } else if (elem.attachEvent) {
      elem.attachEvent('on' + type, handler);
    } else {
      elem['on' + type] = handler;
    }
  },

  removeHandler: function(elem, type, handler) {
    if (elem.removerEventListener) {
      elem.removerEventListener(type, handler, false);
    }else if(elem.detachEvent) {
      elem.detachEvent('on' + type, handler);
    } else {
      elem['on' + type] = null;
    }
  }
};


var btn = document.querySelector('#btn');
var hand = function() {
  console.log('event');
}
EventUtil.addHandler(btn, 'click', hand);

## 冒泡机制和捕获机制

* IE 冒泡机制 W3C都支持
* addEventListener(type, handler, false); 第三个参数表示的就是冒泡机制。
* e.stopPropagation() 和 e.preventDefalut();

// 测试
document.body.addEventListener('click', function(eve){
  console.log(eve);
}, false);

## 这里我们打印出来 eve 是MouseEvent 但是我们发现没有 preventDefalut()方法。但是有一个 __proto__: MouseEvent.
接着点开 发现还是没有 preventDefalut()。但是有 __proto__: UIEvent。但是点开里面还没有。只有 __proto__ Event。
最后我们找到了 preventDefalut(); __proto__: Object;
