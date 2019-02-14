import Balanser from "./Balanser";

const express = require('express');

const app1 = express();

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

let i = 0;
while (i < 100) {
    balanser.sendQuery("SELECT * from table", (res: any) => {
        console.log(res)
    });

    if(i === 50)
        balanser.sendQuery("DROP");

    i++
}
balanser.sendQuery("DELETE");


// // results rendering
// let i = 0;
// let serverNumber;
// let s0 = [];
// const limit = 200;
// while (i < limit) {
//     loadBalancer.sendQuery("SELECT * from table", (res: any) => {
//         serverNumber = res.success[res.success.length - 1]
//         s0.push(serverNumber);
//         console.log(res);
//     });
//     i++
// }

// const intervalID = setInterval(() => {
//     if (s0.length == limit) {
//         console.log(asciichart.plot(s0));
//         clearInterval(intervalID);
//     }
// }, 2000)
// // end of results rendering