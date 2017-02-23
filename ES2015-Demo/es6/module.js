/**
 * Created by adam on 2017/1/5.
 */
class Book {
    constructor(title = 'no title') {
        this.title = title;
    }

    desc() {
        console.log(`this book's title is ${this.title}`);
    }
}

export default Book;