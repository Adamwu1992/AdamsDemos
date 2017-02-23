/**
 * Created by adam on 2016/12/28.
 */

function Compiler(option) {

    this.$el = option.el;
    this.vm = option.vm;

    if(this.$el) {
        this.$fragment = this.nodeToFragment(this.$el);
        this.compile(this.$fragment, this.vm);
        this.$el.appendChild(this.fragment);
    }
}

Compiler.prototype.compile = function (fm, vm) {
    var me = this;
    if(fm.childNodes && fm.childNodes.length) {
        [].slice.call(node.childNodes).forEach(function (child) {
            if(3 === child.nodeType) {

            }else if(1 === child.nodeType) {

            }
        })
    }
}

Compiler.prototype.compileTextNode = function (node) {
    var text = node.textContent.trim(), exp;

    if(text) {
        exp = this.parseText(text);
    }
}

Compiler.prototype.handler = function (str) {

}

Compiler.prototype.parseText = function (text) {
    var reg, prices, matches, tokens = [];

    reg = /\{\{(.+?)\}\}/g;

    prices = text.split(reg);

    matches = text.match(reg);

    prices.forEach(function (price) {
        if(matches && matches.indexOf('{{' + price + '}}') > -1) {
            tokens.push(price);
        }else if(price) {
            tokens.push('"' + price + '"');
        }
    })

    return tokens.join('+');

}

Compiler.prototype.nodeToFragment = function (node) {
    var fragment = document.createDocumentFragment(), child;

    while(child = node.firstChild) {
        if(this.isIgnorable(child)) {
            // node.remove(child);
        }else {
            fragment.appendChild(child);
        }
    }

    return fragment;
}

/**
 * 忽略注释
 * @returns {boolean}
 */
Compiler.prototype.isIgnorable = function (node) {
    var reg = /^\<\!\-\-(.+)\-\-\>$/;
    // return (node.nodeType === 8) || (node.nodeType === 3 && reg.test(node.textContent));
    return false;
}

var $$id = -1