/**
 * Created by adam on 2016/12/1.
 */
window.Util = window.Util || {};

window.Util.popupWindow = (function () {

    var _this = this;

    var win = {

        _renderOverlay: function () {
            this.overlay = document.createElement('div');
            this.overlay.className = 'u-overlay';
            document.body.appendChild(this.overlay);
        },

        _renderWindow: function () {
            var win, w, h;
            if(_this.option.win && (win = document.getElementById(_this.option.win))) {

                win.style.width = typeof (w = _this.option.width) === 'number' ? w + 'px' : w;
                win.style.height = typeof (h = _this.option.height) === 'number' ? h + 'px' : h;
                win.style.margin = "0 auto";
                win.style.display = 'block';
                win.style.backgroundColor = '#fff';
                win.style.border = '1px solid #ccc';

                if(_this.option.showModal) {
                    this.overlay.appendChild(win);
                }
            }
        },


        render: function () {
            if(_this.option.showModal) {
                this._renderOverlay();
            }
            this._renderWindow();
        }
    }

    return {
        init: function (option) {
            _this.option = _u.extend(true, {
                width: 300,
                height: 100,
                showModal: true
            }, option);

            win.render();
        }

    }
})()



window.Util = window.Util || {};

/**
 * 扩展对象
 * @returns {*|{}}
 */
window.Util.extend = function () {
    var option, name, src, copy, copyIsArray, clone,
        //被扩展的对象
        target = arguments[0] || {},
        //需要跳过的参数个数
        i = 1,
        //参数长度
        length = arguments.length,
        //是否深度扩展
        deep = false;

    if(typeof target === 'boolean') {
        deep = target;
        target = arguments[1] || {};
        i = 2;
    }

    if(typeof target !== 'object') {
        target = {};
    }

    //如果没有除了被扩展对象之外的其他参数，直接返回
    if(length === i) {
        return target;
    }

    for(; i < length; i++) {

        if((option = arguments[i]) != null) {

            for(name in option) {
                src = target[name];
                copy = option[name];

                if(target === copy) {
                    continue;
                }

                if(deep && copy  && (_u.isPlainObject(copy) || (copyIsArray = _u.isArray(copy)))) {
                    if(copyIsArray) {
                        clone = src && _u.isArray(src) ? src : [];
                        copyIsArray = false;
                    }else {
                        clone = src && _u.isPlainObject(src) ? src : {};
                    }

                    target[name] = _u.extend(deep, clone, copy);

                }else if(copy !== undefined) {
                    target[name] = copy;
                }

            }
        }

    }

    return target;
}

window.Util.isArray = function (obj) {
    return typeof obj === 'object' && JSON.stringify(obj).match(/^\[/);
}

window.Util.isPlainObject = function (obj) {
    return typeof obj === 'object' && JSON.stringify(obj).match(/^\{/);
}





window._u = window.Util;
