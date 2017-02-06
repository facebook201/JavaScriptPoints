
;(function(window, undefined){
  'use strict';

  var cssTool = function(){
      return new cssTool.prototype.init();
  };

  cssTool.prototype = {
    init: function(){
      console.log('init success');
      return this;
    },
  };

  cssTool.prototype.init.prototype = cssTool.prototype;

  // 暴露接口
  window.cssTool = cssTool;

})(window);
