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
balanser.setStrategy('RoundRobinDNS');
balanser.addDatabase({ port: '1000', userName: 'asd', password: 'ad', databaseName: 'db' });
balanser.addDatabase({ port: '1001', userName: 'asd1', password: 'asd1', databaseName: 'db1' });
balanser.addDatabase({ port: '1002', userName: 'asd2', password: 'asd2', databaseName: 'db2' });
balanser.addDatabase({ port: '1003', userName: 'asd3', password: 'asd3', databaseName: 'db3' });
balanser.addDatabase({ port: '1004', userName: 'asd3', password: 'asd3', databaseName: 'db3' });
balanser.addDatabase({ port: '1005', userName: 'asd3', password: 'asd3', databaseName: 'db3' });
balanser.addDatabase({ port: '1006', userName: 'asd3', password: 'asd3', databaseName: 'db3' });
balanser.addDatabase({ port: '1007', userName: 'asd3', password: 'asd3', databaseName: 'db3' });
balanser.addDatabase({ port: '1008', userName: 'asd3', password: 'asd3', databaseName: 'db3' });
balanser.addDatabase({ port: '1009', userName: 'asd3', password: 'asd3', databaseName: 'db3' });
// results rendering
var i = 0;
var serverNumber;
var s0 = [];
var limit = 200;
while (i < limit) {
    balanser.sendQuery("SELECT * from table", function (res) {
        serverNumber = res.success[res.success.length - 1];
        s0.push(serverNumber);
        console.log(res);
    }, (Math.floor(Math.random() * 1009) + 1000).toString());
    i++;
}
var intervalID = setInterval(function () {
    if (s0.length == limit) {
        console.log(asciichart.plot(s0));
        clearInterval(intervalID);
    }
}, 2000);
// end of results rendering
