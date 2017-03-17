/**
 * 一 Ajax的核心是 XMLHttpRequest
 * 实例化 XMLHttpRequest对象
 * 连接服务器
 * 发送请求
 * 接收响应数据
 */

// params 是配置对象

function ajax(params){
    params = params || {};
    params.data = params.data || {};
    // 判断是ajax请求还是 jsonp请求
    var json = params.jsonp ? jsonp(params) : json(params);
   

    // jsonp 请求
    function jsonp(params){
        // 创建script标签加入页面
        var callbackName = params.jsonp;
        var head = document.getElementsByTagName('head')[0];
        // 设置传递给后台的回调参数名
        params.data['callback'] = callbackName;
        var data = formatParams(params.data);
        var script = document.createElement('script');
        head.appendChild(script);

        // 创建jsonp回调函数
        window[callbackName] = function(json){
            head.removeChild(script);
            clearTimeout(script.timer);
            window[callbackName] = null;
            params.success && params.success(json);
        };

        // 发送请求
        script.src = params.url + '?' + data;

        //为了得知此次请求是否成功 设置超时处理
        if (params.time){
            script.timer = setTimeout(function(){
                window[callbackName] = null;
                head.removeChild(script);
                params.error && params.error({
                    message: '超时'
                });
            }, timer);
        }
    };




    //ajax请求
    function json(params){
        //请求方式 默认是GET
        params.type = (params.type || 'GET').toUpperCase();
        // 避免有特殊字符 必须格式化传输数据
        params.data = formatParams(params.data);
        var xht = null;

        //实例化XMLHttpRequest对象
        if(window.XMLHttpRequest){
            xhr = new XMLHttpRequest();
        }else{
            // IE6-
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
        };

        //监听事件 只要 readyState 的值变化 就会调用readyStatechange 事件
        xhr.onreadyStatechange = function(){
            // readyState 属性表示请求/响应过程的当前活动阶段 4表示完成
            if(xhr.readyState == 4){
                var status = xhr.status;
                // status：响应的HTTP状态码 以 2开头的都是成功的
                if(status >= 200 && status <= 300){
                    var response = '';
                    //判断接受数据的内容类型
                    var type = xhr.getResponseHeader('Content-type');
                    if(type.indexOf('xml') !== -1 && xhr.responedXML){
                        response = xhr.responedXML;
                    }else if(type === 'application/json'){
                        response = JSON.parse(xhr.responseText);
                    }else{
                        response = xhr.responseText;
                    };
                    // 成功回调函数
                    params.success && params.success(response);
                }else{
                    params.error && params.error(status);
                }
            };
        };
        // 连接和传输数据
        if(params.type == 'GET'){
            // 三个参数 请求方式 请求地址 是否异步
            xhr.open(params.type, params.url + "?" + params.data, true);
            xhr.send(null);
        }else{
            xhr.open(params.type, params.url, true);
            // 必须设置提交时的内容类型
            xhr.setRequestHeader('Content-type', 'application/x-www-from-urlencoded; charset=UTF-8');
            // 传输数据
            xhr.send(params.data);
        }
    }

    //格式化参数

    function formatParams(data){
        var arr = [];
        for(var name in data){
            // encodeURIComponent() 对于URI中的某一部分进行编码
            arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
        };
        // 添加一个随机数参数 放置缓存
        arr.push('v=' + random());
        return arr.join('&');
    }

    // 获取随机数
    function random(){
        return Math.floor(Math.random() * 1000 + 500);
    }
}


ajax({
    url: 'test.php',                 // 请求地址
    jsonp: 'jsonpcallback',          // 采用jsonp请求 且回调函数名 " jsonpcallback"
    data: {'b': '异步请求'},          // 传输数据
    success: function(res){          // 请求成功的回调函数
        console.log(res);
    },
    error: function(error){}
});


/**
 *  二 jsonP
 *  组成部分 回调函数 和 数据。回调函数一般在浏览器端。作为参数发往服务器端。
 *  当服务器响应时 服务端就会把该函数和数据拼接字符串返回。
 *
 * 请求过程：
 * 请求阶段：浏览器创建一个 script标签，给其src赋值
 * 发送请求：当给 script的src赋值时。浏览器就会发起一个请求
 * 数据响应：服务器将要返回的数据和函数拼接在一起
 */
