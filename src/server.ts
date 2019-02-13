const body = require('body-parser');
const express = require('express');
// require('typescript-require');
// const {LoadBalancer} = require('./LoadBalancer.js');
const LoadBalancer = require( 'LoadBalancer.js');

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
loadBalancer.setStrategy('DNSDelegation');
loadBalancer.addDatabase({ port: '1000', name: 'asd', password: 'ad', queryRate: 1 });
loadBalancer.addDatabase({ port: '1001', name: 'asd1', password: 'asd1', queryRate: 2 });
loadBalancer.addDatabase({ port: '1002', name: 'asd2', password: 'asd2', queryRate: 3 });
loadBalancer.addDatabase({ port: '1003', name: 'asd3', password: 'asd3', queryRate: 4 });

loadBalancer.sendQuery("SELECT * from table", (res: any) => {
    console.log(res)
});
loadBalancer.sendQuery("DELETE wszystko nieznam sql xD from table");
loadBalancer.deleteDatabase('1003');
