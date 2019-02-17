import Balanser from "./Balanser";
const express = require('express');
const app1 = express();
const asciichart = require('asciichart');

let balanser = new Balanser();

console.log('server--------');

balanser.setStrategy('DNSDelegation');
balanser.addDatabase({ port: 5433, userName: '6bart', password: 'password1', databaseName: 'dvdrental'});
balanser.addDatabase({ port: 5434, userName: '6bart', password: 'db1supw', databaseName: 'dvdrental'});
balanser.addDatabase({ port: 5435, userName: '6bart', password: 'password', databaseName: 'dvdrental'});

console.log('DATABASES ADDED ------------------------');

// results rendering
let i = 0;
let s0 = [];
const limit = 10;
while (i < limit) {
    var num = 100 + 5 * i;
    balanser.sendQuery('SELECT * FROM actor WHERE actor_id = $1',[num], (res: any) => {
        //s0.push(res.success[res.success.length - 1]);
        console.log(res);
    });
    i++

    // //RoundRobinDNS
    // balanser.sendQuery("SELECT * from table", (res: any) => {
    //     s0.push(res.success[res.success.length - 1]);
    //     console.log(res);
    // }, (Math.floor(Math.random() * 1009) + 1000).toString());
    // i++

}

const intervalID = setInterval(() => {
    if (s0.length == limit) {
        console.clear();
        console.log(asciichart.plot(s0));
        clearInterval(intervalID);
    }
}, 2000)

// end of results rendering
