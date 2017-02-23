/**
 * Created by adam on 2017/1/10.
 */


function Obverse(data) {
    this.data = data;
    this.obverse(data);
}

Obverse.prototype.obverse = function (data) {
    var me = this;
    if(!data || typeof data !== 'object') {
        return;
    }

    Object.keys(data).forEach(function (key) {
        me.obverseObject(data, key, data[key]);
    })
}

Obverse.prototype.obverseObject = function (data, key, val) {
    var me = this,
        dep = new Dep();

    Object.defineProperty(data, key, {
        configurable: false,
        enumerable: true,
        get: function () {
            Dep.target && dep.addSub(Dep.target) && (Dep.target = null);
            return val;
        },
        set: function (nVal) {
            if(nVal !== val) {
                val = nVal;
                me.obverse(val);
                dep.notify();
            }
        }
    })

    me.obverse(val);
}