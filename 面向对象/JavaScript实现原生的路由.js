;(function(window, undefined){

    // 定义路由容器
    function Router() {
        this.routes = {};
        this.currentUrl = '';
    }
    Router.prototype = {
        route: function(path, callback){
            this.routes[path] = callback || function(){};
        },
        refresh: function(){
            this.currentUrl = window.location.hash.slice(1) || '/';
            this.routes[this.currentUrl]();
        },
        init: function(){
            window.addEventListener('load', this.refresh.bind(this), false);
            window.addEventListener('hashchange', this.refresh.bind(this), false);
        }
    };

    window.Router = new Router();
    window.Router.init();
})(window || (window = {}));


const content = document.querySelector('body');

function changeBgColor(color){
	content.style.backgroundColor = color;
}
Router.route('/', function(){
	changeBgColor('white');
});
Router.route('/red', function(){
	changeBgColor('red');
});
Router.route('/green', function(){
	changeBgColor('green');
});
