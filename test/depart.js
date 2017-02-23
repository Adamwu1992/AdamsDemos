/**
 * Created by adam on 16/4/18.
 */
var DEPART = {
    data: ['999', '888', '777', '666'],

    add: function(name) {
        this.data.push(name);
    },

    del: function(name) {
        for(var i = 0, l = this.data.length; i < l; i++) {
            if(this.data[i] == name) {
                this.data.splice(i, 1);
                //this.data = this.data.slice(0, i).concat(this.data.slice(i + 1, ))
            }
        }
    },

    update: function(name, newName) {
        /*this.data.forEach(function(e) {
            if(e == name) {
                e = newName;
            }
        })*/
        for(var i = 0, l = this.data.length; i < l; i++) {
            if(this.data[i] == name) {
                this.data[i] = newName;
            }
        }
    },

    search: function(name) {
        this.data.forEach(function(e) {
            if(e == name) {
                //return e;
                console.log(e);
            }
        })
    },

    showData: function() {
        console.log(this.data);
    },

    test: function() {
        var arr = ['1', '2', '3', '4', '5'];
        console.log(arr.splice(0, 3));
        console.log(arr);

        /*console.log('test');
        this.data.slice(0, 2);*/
    }
}

DEPART.showData();

DEPART.add('001');
DEPART.showData();

DEPART.update('999', 'wyf');
DEPART.showData();

DEPART.search('wyf');

DEPART.del('666');
DEPART.showData();

/*DEPART.test();
DEPART.showData();*/

//DEPART.test();

