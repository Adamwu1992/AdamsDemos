/**
 * Created by adam on 2016/11/14.
 */



(function () {

    /**
     * 定时器类
     * @param delay
     */
    var timer = function (delay) {
        this._queue = [];
        this.stop = false;
        this._createTimer(delay);
    };

    timer.prototype = {

        constructor: timer,

        _createTimer: function (delay) {
            var self = this,
                first = true;

            /**
             * 循环体
             */
            (function () {
                var s = new Date();
                //执行队列中的定时任务
                for(var i = 0; i < self._queue.length; i++) {
                    self._queue[i]();
                }

                if(!self.stop) {
                    //第一次循环时，消除执行队列中函数产生的阻塞
                    var cost = new Date() - s;
                    delay = first ? delay : ((cost - delay > 0) ? cost - delay : delay);
                    setTimeout(arguments.callee, delay);
                }
            })();
            
            first = false;

        },

        /**
         * 添加定时任务
         * @param cb
         * @returns {number}
         */
        add: function (cb) {
            this._queue.push(cb);
            this.stop = false;
            return this._queue.length - 1;
        },

        /**
         * 删除定时任务
         * @param index
         */
        remove: function (index) {
            this._queue.splice(index, 1);
            if(!this._queue.length) {
                this.stop = true;
            }
        }
    };


    /**
     * 定时器池
     * 根据延迟不同存放定时器
     * 保证定时器的数量最少
     */
    var timePool = function () {
        this._pool = {};
    };

    timePool.prototype = {

        constructor: timePool,

        getTimer: function (delayTime) {
            var t = this._pool[delayTime];
            return t ? t : (this._pool[delayTime] = new timer(delayTime));
        },

        removeTimer: function (delayTime) {
            if(this._pool[delayTime]) {
                delete this._pool[delayTime];
            }
        }

    };


    var delayTime = 1000;//延迟为1秒
    var msInterval = new timePool().getTimer(delayTime);//延迟为1秒的定时器

    /**
     * 倒计时类
     * @param config
     */
    var countDown = function (config) {

        var defaultOptions = {
            fixNow: 3*1000,
            fixNowDate: false,
            now: new Date().valueOf(),
            template: '{d}:{h}:{m}:{s}',
            render: function (outstring) {
                console.log(outstring);
            },
            end: function () {
                console.log('the end.');
            },
            endTime: new Date().valueOf() + 1000*10
        };

        for(var s in defaultOptions) {
            if(defaultOptions.hasOwnProperty(s)) {
                this[s] = config[s] || defaultOptions[s];
            }
        }

        this.init();

    };

    countDown.prototype = {

        constructor: countDown,

        init: function () {
            var self = this;
            if(this.fixNowDate) {
                //创建一个定时器 矫正时间
                var fix = new timer(this.fixNow);
                fix.add(function () {
                    self.getNowTime(function (now) {
                        //将获取的服务器时间设置到当前对象
                        self.now = now;
                    })
                })
            }

            var index = msInterval.add(function () {
                self.now += delayTime;
                if(self.now > self.endTime) {
                    msInterval.remove(index);
                    self.end();
                }else {
                    self.render(self.getOutString());
                }
            });
        },

        getBetween: function () {
            return _formatTime(this.endTime - this.now);
        },

        getOutString: function () {
            var between = this.getBetween();
            var _this = this;
            return this.template.replace(/{(\w*)}/g, function (m, key) {
                return between.hasOwnProperty(key) ? between[key] : '';
            });
        },

        getNowTime: function (cb) {
            var xhr = new XMLHttpRequest();
            xhr.open('get', '/', true);
            xhr.onreadystatechange = function () {
                if(3 === xhr.readyState) {
                    var now = xhr.getResponseHeader('Date');
                    cb(new Date(now).valueOf());
                    xhr.abort();
                }
            };
            xhr.sned(null);
        }
    };

    var _cover = function (num) {
        var n = parseInt(num, 10);
        return n < 10 ? '0' + n : n;
    };

    var _formatTime = function (ms) {
        var s = ms / 1000,
            m = s / 60;
        return {
            d: _cover(m / 60 / 24),
            h: _cover(m / 60 % 24),
            m: _cover(m % 60),
            s: _cover(s % 60)
        };
    };


    var now = new Date().valueOf();
    // new countDown({});
    /*new countDown({
        endTime: now + 8*1000
    })*/

})();