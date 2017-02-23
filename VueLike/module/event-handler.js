/**
 * Created by adam on 2016/12/28.
 */

function EventHandler() {
    this.handlers = {};
    
    this.on = function (exp, vm, cb, option) {
        if(this.handlers[exp]) {
            this.handlers[exp].push(new Watcher(vm, cb, option));
        }else {
            this.handlers[exp] = [new Watcher(vm, cb, option)];
        }
    }
    
    this.off = function (exp) {
        if(this.handlers[exp]) delete this.handlers[exp];
    }
    
    this.emit = function (exp) {
        if(this.handlers[exp]) {
            this.handlers[exp].forEach(function (e) {
                e.run();
            })
        }
    }
}

function Watcher(vm, cb, option) {
    this.vm = vm;
    this.cb = cb;
    this.option = option;
    
    this.run = function () {
        this.cb.call(this.vm, this.option);
    }
}