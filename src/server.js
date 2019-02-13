const LoadBalancer = require('./LoadBalancer.js')

const body = require('body-parser');
const express = require('express');

const app1 = express();
const app2 = express();

const port1 = 3000;
const port2 = 3001;

// Parse the request body as JSON
app1.use(body.json());
app2.use(body.json());

const handler = serverNum => (req, res) => {
    console.log(`server ${serverNum}`, req.method, req.url, req.body);

    if (serverNum === 1) {
        setTimeout(() => {
            console.log('settimeout finished');
            res.send(`Hello from server ${serverNum}!!!`);
        }, 3000);
    } else {
        res.send(`Hello from server ${serverNum}!`);
    }

};

// Only handle GET and POST requests
app1.get('*', handler(1)).post('*', handler(1));
app2.get('*', handler(2)).post('*', handler(2));

app1.listen(port1, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`http://localhost:${port1}/world`);
    }
});
app2.listen(port2, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`http://localhost:${port2}/hello`);
    }
});

//1 przykladowe uzycie

let loadBalancer = LoadBalancer.getInstance('RequestCounting');

loadBalancer.addDatabase({port:'1000', name: 'asd', password: 'asd', queryRate: 1});
loadBalancer.addDatabase({port:'1001', name: 'asd1', password: 'asd1', queryRate: 2});
loadBalancer.addDatabase({port:'1002', name: 'asd2', password: 'asd2', queryRate: 3});
loadBalancer.addDatabase({port:'1003', name: 'asd3', password: 'asd3', queryRate: 4});

loadBalancer.sendQuery("SELECT * from table", res => console.log(res));
loadBalancer.sendQuery("DELETE wszystko nieznam sql xD from table");
loadBalancer.deleteDatabase('1003');


//2 przykladowe uzycie


let loadBalancer2 = LoadBalancer.getInstance('DNSDelegation');

loadBalancer2.addDatabase({port:'2000', name: 'asd', password: 'asd'});
loadBalancer2.addDatabase({port:'2001', name: 'asd1', password: 'asd1'});
loadBalancer2.addDatabase({port:'2002', name: 'asd2', password: 'asd2'});
loadBalancer2.addDatabase({port:'2003', name: 'asd3', password: 'asd3'});

loadBalancer2.sendQuery("SELECT * from table", res => console.log(res));
loadBalancer2.sendQuery("DELETE wszystko nieznam sql xD from table");
loadBalancer2.deleteDatabase('2003');


//3 przykladowe uzycie


let loadBalancer3 = LoadBalancer.getInstance('RoundRobinDNS');

loadBalancer3.addDatabase({port:'3000', name: 'asd', password: 'asd'});
loadBalancer3.addDatabase({port:'3001', name: 'asd1', password: 'asd1'});
loadBalancer3.addDatabase({port:'3002', name: 'asd2', password: 'asd2'});
loadBalancer3.addDatabase({port:'3003', name: 'asd3', password: 'asd3'});

loadBalancer3.sendQuery("SELECT * from table", res => console.log(res), 3001);
loadBalancer3.sendQuery("DELETE wszystko nieznam sql xD from table");
loadBalancer3.deleteDatabase('3003');