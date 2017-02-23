/**
 * Created by adam on 2017/1/10.
 */

var $uid = -1;

function Watcher(exp, scope, callback) {
    this.exp = exp;
    this.scope = scope;
    this.callback = callback;

    this.uid = ++$uid;
    this.value = null;
    this.update();
}

Watcher.prototype.get = function () {
    Dep.target = this;
    var value = computeValue(this.exp, this.scope);
    Dep.target = null;
    return value;
}
Watcher.prototype.update = function () {
    var newVal = this.get();
    if(!equal(newVal, this.value)) {
        this.callback && this.callback.call(this, newVal);
        this.value = newVal;
    }
}

function computeValue(exp, vm) {
    var s;
    try {
        with (vm) {
            s = eval(exp);
        }
    }catch (e) {
        console.log(exp);
    }
    return s;
}

function isObject(value) {
    return !value && typeof value === 'object';
}

function equal(a, b) {
    var ret;
    if(isObject(a) && isObject(b)) {
        ret = JSON.stringify(a) === JSON.stringify(b);
    }else if(!isObject(a) && !isObject(b)) {
        ret = a.toString() === b.toString();
    }else {
        ret = false;
    }
    return ret;
}


function Dep() {
    this.subs = {};
}
Dep.prototype.addSub = function (target) {
    if(!this.subs[target.uid]) {
        this.subs[target.uid] = target;
    }
}
Dep.prototype.notify = function () {
    for(var uid in this.subs) {
        this.subs[uid].update();
    }
}
Dep.target = null;
