"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Balanser_1 = __importDefault(require("./Balanser"));
var express = require('express');
var app1 = express();
var asciichart = require('asciichart');
var balanser = new Balanser_1.default();
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
var i = 0;
var s0 = [];
var limit = 1;
while (i < limit) {
    var num = 100 + i % 100;
    var dest = 5433 + i % 5;
    //'DELETE FROM film_actor WHERE actor_id = $1',[124],
    //'SELECT * FROM actor WHERE actor_id = $1', [123]
    balanser.sendQuery('UPDATE film_actor SET last_update = $1 WHERE actor_id = $2', ["2006-02-15 10:05:05", 125], function (res) {
        //s0.push(res.success[res.success.length - 1]);
        //console.log(res);
    }, dest);
    i++;
    // //RoundRobinDNS
    // balanser.sendQuery("SELECT * from table", (res: any) => {
    //     s0.push(res.success[res.success.length - 1]);
    //     console.log(res);
    // }, (Math.floor(Math.random() * 1009) + 1000).toString());
    // i++
}
var intervalID = setInterval(function () {
    if (s0.length == limit) {
        console.clear();
        console.log(asciichart.plot(s0));
        clearInterval(intervalID);
    }
}, 2000);
// end of results rendering
