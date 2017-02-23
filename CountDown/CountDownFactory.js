/**
 * Created by adam on 2016/11/11.
 *
 *
 * 倒计时组建
 *
 * 工厂模式实现
 */


var countDown = {};

/**
 * 向左补全
 * @param n 原始字符
 * @param len 补全长度
 * @param ch 填充字符 默认为空格
 */
countDown.leftPad = function (n, len, ch) {

    n = String(n);
    var i = -1;
    if(!ch && ch !== 0) ch = ' ';
    len = len - n.length;

    while (++i < len) {
        n = ch + n;
    }

    return n;
};

/**
 * 时间换算成秒数
 * @param t
 * @returns {*}
 */
countDown.timeToSecond = function (t) {
    return t;
};


countDown.create = function (obj) {

    var o = {}, newCountDown;

    o.dom = document.getElementById(obj.id);
    o.startMS = +new Date(obj.startTime || 0);
    o.endMS = +new Date(obj.endTime || 0);
    obj.totalTime && (o.totalTime = countDown.timeToSecond(o.totalTime));

    newCountDown = new countDown.style[obj.style](o);

    newCountDown.go = function (callback) {

        callback && (newCountDown.callback = callback);
        newCountDown.render();
        clearInterval(newCountDown.timer);
        newCountDown.timer = setInterval(newCountDown.render, 1000)
    };

    return newCountDown;

};


/**
 * 自定义样式
 * @type {{}}
 */
countDown.style = {};

countDown.style.default = function (obj) {

    this.dom = obj.dom;
    this.startMS = obj.startMS;
    this.endMS = obj.endMS;

    this.count = 0;

    var _this = this;
    
    this.render = function () {
        var currentMS = +new Date(),
            diff = (_this.endMS - currentMS) / 1000,
            d = parseInt(diff / 60 / 60 / 24);

        d = countDown.leftPad(d, 2, 0);
        d.replace(/(\d)/g, '<span>$1</span>');
        _this.dom.innerHTML = '倒计时：' + d + '天  (刷新次数:' + ++_this.count + ')';
        if(currentMS > _this.endMS) {
            clearInterval(_this.timer);
            if(_this.callback) {
                _this.callback();
            }else {
                _this.dom.innerHTML = '倒计时结束';
            }
        }
    };

};
