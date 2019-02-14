const body = require('body-parser');
const express = require('express');
// require('typescript-require');
// const {LoadBalancer} = require('./LoadBalancer.js');
const LoadBalancer = require('./LoadBalancer').LoadBalancer;

const app1 = express();
const app2 = express();

const port1 = 3000;
const port2 = 3001;

// Parse the request body as JSON
app1.use(body.json());
app2.use(body.json());

const handler = (serverNum: any) => (req: any, res: any) => {
    console.log(`server ${serverNum}`, req.method, req.url, req.body);

    if (serverNum === 1) {
        setTimeout(() => {
            console.log('settimeout finished');
            res.send(`Hello from server ${serverNum}!`);
        }, 3000);
    } else {
        res.send(`Hello from server ${serverNum}!`);
    }

};

// Only handle GET and POST requests
app1.get('*', handler(1)).post('*', handler(1));
app2.get('*', handler(2)).post('*', handler(2));

app1.listen(port1, (err: any) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`http://localhost:${port1}/world`);
    }
});
app2.listen(port2, (err: any) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`http://localhost:${port2}/hello`);
    }
});

//1 przykladowe uzycie
const callback = (res: any) => {
    console.log(res)
}

let loadBalancer = LoadBalancer.getInstance();
loadBalancer.setStrategy('RoundRobinDNS');
loadBalancer.addDatabase({ port: '1000', userName: 'asd', password: 'ad', databaseName: 'db'});
loadBalancer.addDatabase({ port: '1001', userName: 'asd1', password: 'asd1', databaseName: 'db1'});
loadBalancer.addDatabase({ port: '1002', userName: 'asd2', password: 'asd2', databaseName: 'db2'});
loadBalancer.addDatabase({ port: '1003', userName: 'asd3', password: 'asd3',  databaseName: 'db3'});

loadBalancer.sendQuery("SELECT * from table", (res: any) => {
    console.log(res)
}, '1000');
loadBalancer.sendQuery("SELECT * from table", (res: any) => {
    console.log(res)
}, '1000');
loadBalancer.sendQuery("SELECT * from table", (res: any) => {
    console.log(res)
}, '1000');
loadBalancer.sendQuery("SELECT * from table", (res: any) => {
    console.log(res)
}, '1000');
loadBalancer.sendQuery("SELECT * from table", (res: any) => {
    console.log(res)
}, '1000');
loadBalancer.sendQuery("SELECT * from table", (res: any) => {
    console.log(res)
}, '1000');
loadBalancer.sendQuery("DELETE wszystko nieznam sql xD from table");
loadBalancer.deleteDatabase('1003');
