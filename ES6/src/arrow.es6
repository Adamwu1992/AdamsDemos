/**
 * Created by adam on 16/9/14.
 */

const arr = [1, 2, 3, 4, 5, 6, 99, 134, 983];
let temp = [];

arr.map(item => {
    if(0 === item%2) {
        temp.push(item)
    }
});

console.log(temp);