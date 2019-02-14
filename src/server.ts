import Balanser from "./Balanser";
const express = require('express');
const app1 = express();
const asciichart = require('asciichart');


let balanser = new Balanser();

balanser.setStrategy('DNSDelegation');
balanser.addDatabase({ port: '1000', userName: 'asd', password: 'ad', databaseName: 'db'});
balanser.addDatabase({ port: '1001', userName: 'asd1', password: 'asd1', databaseName: 'db1'});
balanser.addDatabase({ port: '1002', userName: 'asd2', password: 'asd2', databaseName: 'db2'});
balanser.addDatabase({ port: '1003', userName: 'asd3', password: 'asd3',  databaseName: 'db3'});
balanser.addDatabase({ port: '1004', userName: 'asd3', password: 'asd3',  databaseName: 'db3'});
balanser.addDatabase({ port: '1005', userName: 'asd3', password: 'asd3',  databaseName: 'db3'});
balanser.addDatabase({ port: '1006', userName: 'asd3', password: 'asd3',  databaseName: 'db3'});
balanser.addDatabase({ port: '1007', userName: 'asd3', password: 'asd3',  databaseName: 'db3'});
balanser.addDatabase({ port: '1008', userName: 'asd3', password: 'asd3',  databaseName: 'db3'});
balanser.addDatabase({ port: '1009', userName: 'asd3', password: 'asd3',  databaseName: 'db3'});

// results rendering
let i = 0;
let s0 = [];
const limit = 200;
while (i < limit) {
    balanser.sendQuery("SELECT * from table", (res: any) => {
        s0.push(res.success[res.success.length - 1]);
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
