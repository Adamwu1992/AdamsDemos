/**
 * Created by adam on 2017/1/12.
 */

function Compiler(option) {
    this.el = document.querySelector(option.el);
    this.scope = option.scope;
    if(this.el) {
        this.fragment = nodeToFragment(this.el);
        this.compile(this.fragment, this.scope);
        this.el.appendChild(this.fragment);
    }

}

Compiler.prototype.compile = function (node, scope) {
    var me = this;
    if(node.childNodes && node.childNodes.length) {
        //将nodeList对象转化为数组
        [].slice.call(node.childNodes).forEach(function (node) {
            if(node.nodeType === 3) {
                me.compileTextNode(node, scope);
            }else if(node.nodeType === 1) {
                me.compileElementNode(node, scope);
            }
        })
    }
}
Compiler.prototype.compileTextNode = function (node, scope) {
    var text = node && node.textContent.trim();
    text && this.textHandler(node, scope || this.scope, parseTextExp(text))
}
Compiler.prototype.textHandler = function (node, scope, exp) {
    this.bindWatcher(node, scope, exp, 'text');
}
Compiler.prototype.bindWatcher = function (node, scope, exp, type) {
    var updateFn = updateUtil[type];
    new Watcher(exp, scope, function (newVal) {
        updateFn && updateFn(node, newVal);
    })
}
Compiler.prototype.compileElementNode = function (node, scope) {

}

function nodeToFragment(node) {
    var fragment = document.createDocumentFragment(),
        child;

    while (child = node.firstChild) {
        if(isIgnorable(child)){
            node.removeChild(child);
        }else {
            fragment.appendChild(child);
        }
    }

    return fragment;
}

function parseTextExp(text) {
    var reg, prices, matches, token = [];
    reg = /\{\{(\w+?)\}\}/g;
    prices = text.split(reg);
    matches = text.match(reg);
    prices.forEach(function (price) {
        if(matches && matches.indexOf('{{' + price + '}}') > -1) {
            token.push(price);
        }else {
            price !== '' && token.push('"' + price + '"');
        }
    });
    return token.join('+');
}

function isIgnorable(node) {
    return node.nodeType === 8;
}

var updateUtil = {
    text: function (node, newVal) {
        node.textContent = newVal ? newVal : '';
    }
}