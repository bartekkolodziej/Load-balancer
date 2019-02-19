import Balanser from "./Balanser";
const express = require('express');
const app1 = express();
const asciichart = require('asciichart');

let balanser = new Balanser();

console.log('server--------');

balanser.setStrategy('RequestCounting');
//balanser.addDatabase({ port: 5433, userName: '6bart', password: 'password', databaseName: 'dvdrental'});
balanser.addDatabase({ port: 5433, userName: '6bart', password: 'password', databaseName: 'dvdrental' });
balanser.addDatabase({ port: 5434, userName: '6bart', password: 'password', databaseName: 'dvdrental' });
balanser.addDatabase({ port: 5435, userName: '6bart', password: 'password', databaseName: 'dvdrental' });
balanser.addDatabase({ port: 5436, userName: '6bart', password: 'password', databaseName: 'dvdrental' });
balanser.addDatabase({ port: 5437, userName: '6bart', password: 'password', databaseName: 'dvdrental' });

console.log('DATABASES ADDED ------------------------');

// results rendering
let i = 0;
let s0 = [];
const limit =1;
while (i < limit) {
    var num = 100 + i % 100;
    var dest = 5433 + i % 5;
    //'DELETE FROM film_actor WHERE actor_id = $1',[124],
    //'SELECT * FROM actor WHERE actor_id = $1', [123]
    balanser.sendQuery('UPDATE film_actor SET last_update = $1 WHERE actor_id = $2', ["2006-02-15 10:05:05", 125 ], (res: any) => {
        //s0.push(res.success[res.success.length - 1]);
        //console.log(res);
    }, dest);
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
