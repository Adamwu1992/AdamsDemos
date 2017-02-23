/**
 * Created by adam on 16/9/14.
 */



class Animal {

    constructor(name, color) {
        this.name = name;
        this.color = color;
    }

    toString() {
        return this.color + ' ' + this.name;
    }
}

let dog = new Animal('dog', 'black');
console.log(dog.toString());


class Cat extends Animal {

    constructor(color, action) {
        super('cat', color);
        this.action = action;
    }

    toString() {
        return super.toString() + ' ' + this.action;
    }
}

let Kitty = new Cat('White', 'likes fish');
console.log(Kitty.toString());
