/**
 * Created by adam on 2017/1/10.
 */

function Vue(option) {

    this.$data = option.data;
    option = Object.assign({}, {
        computed: {},
        methods: {}
    }, option);
    this.$option = option;

    this._proxy(option);

    new Obverse(this.$data) && new Compiler({el: option.el, scope: this});

}
Vue.prototype._proxy = function (param) {
    var me = this, items = ['data'];
    items.forEach(function (item) {
        Object.keys(param[item]).forEach(function (key) {
            Object.defineProperty(me, key, {
                configurable: true,
                enumerable: false,
                get: function () {
                    return me.$data[key];
                },
                set: function (newVal) {
                    me.$data[key] = newVal;
                }
            })
        })
    })
}