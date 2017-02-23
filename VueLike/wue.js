/**
 * Created by adam on 2016/12/20.
 */


var Wue = function (opt) {

    var me = this;

    this.$option = opt;
    var data = this._data = this.$option.data;

    Object.keys(data).forEach(function (key) {
        me._proxy(key);
    })
    // var obv = new Obverse(data);
}
Wue.prototype.$watch = function (exp, cb, option) {
    new Watcher(this, exp, cb, option);
}
Wue.prototype._proxy = function (key) {
    var me = this;
    Object.defineProperty(me, key, {
        configurable: true,
        enumerable: true,
        get: function () {
            return me._data[key];
        },
        set: function (newVal) {
            me._data[key] = newVal;
        }
    })
}

/**
 * 劫持所有属性的setter方法
 * @param data
 * @constructor
 */
var Obverse = function (data) {
    
    var dep = new Dep();
    
    this.data = data;
    this.convert(data);
}
Obverse.prototype.convert = function (data) {
    var me = this;
    if(!data || typeof data !== 'object') {
        return;
    }

    Object.keys(data).forEach(function (key) {
        me.defineReactive(data, key, data[key]);
    })
}
Obverse.prototype.defineReactive = function (data, key, val) {
    var me = this,
        dep = new Dep();

    Object.defineProperty(data, key, {
        get: function () {
            Dep.target && dep.addSub(Dep.target);
            return val;
        },
        set: function (newVal) {
            if(val === newVal) {
                return;
            }
            dep.notify();
            val = newVal;
            me.convert(val);
        }
    })

    me.convert(val);
}


function Dep() {
    this.subs = [];
}
Dep.prototype.addSub = function (sub) {
    this.subs.push(sub);
}
Dep.prototype.notify = function () {

    var subs = this.subs.slice();
    for(var i = 0, l = subs.length; i < l; i++) {
        subs[i].update();
    }

}

Dep.target = null;


/**
 * 消息订阅者 观察特定的属性值是否发生变化
 * @param vm
 * @param exp 被观察的属性值
 * @param cb 发生变化时的回调函数
 * @param option
 * @constructor
 */
function Watcher(vm, exp, cb, option) {
    this.vm = vm;
    this.exp = exp;
    this.cb = cb;
    this.option = option;
    this.value = this.get()
}
Watcher.prototype.get = function () {
    var value;
    Dep.target = this;
    value = this.vm._data[this.exp];
    Dep.target = null;
    return value;
}
Watcher.prototype.run = function () {
    var value = this.get();
    if(value !== this.value) {
        this.value = value;
        this.cb.call(this.vm, this.option || this.vm);
    }
}
Watcher.prototype.update = function () {
    this.run();
}

