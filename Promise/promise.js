/**
 * Created by adam on 2017/1/3.
 */


var Promise = function () {
    this.doneHandlers = [];
    this.failHandlers = [];
    this.state = 'pending';
}
Promise.prototype = {
    constructor: Promise,
    resolve: function () {
        this.state = 'resolved';
        var list = this.doneHandlers,
            i, l;
        for(i = 0, l = list.length; i < l; i++) {
            list[i].call(this);
        }
        return this;
    },
    reject: function () {
        this.state = 'rejected';
        var list = this.failHandlers,
            i, l;
        for(i = 0, l = list.length; i < l; i++) {
            list[i].call(this);
        }
        return this;
    },
    done: function () {
        if(arguments.length !== 1) {
            return;
        }
        (typeof arguments[0] === 'function') && this.doneHandlers.push(arguments[0]);
        return this;
    },
    fail: function () {
        if(arguments.length !== 1) {
            return;
        }
        (typeof arguments[0] === 'function') && this.failHandlers.push(arguments[0]);
        return this;
    },
    always: function () {
        if(arguments.length !== 1) {
            return;
        }
        (typeof arguments[0] === 'function')
            && this.doneHandlers.push(arguments[0])
            && this.failHandlers.push(arguments[0]);
        return this;
    },
    then:function () {
        var doneHandler = arguments[0],
            failHandler = arguments[1];
        (typeof doneHandler === 'function') && this.doneHandlers.push(doneHandler);
        (typeof failHandler === 'function') && this.failHandlers.push(failHandler);
        return this;
    }
}

function when() {
    var p = new Promise(),
        allDone = true,
        len = arguments.length;

    for(var i = 0; i < len; i++) {
        var func = arguments[i];
        if(!func instanceof Promise) {
            return;
        }else {
            func().always(function () {
                if(this.state !== 'resolved') {
                    allDone = false;
                }
                if(--len === 0) {
                    allDone ? p.resolve() : p.reject();
                }
            })
        }
    }

    return p;
}