const LoadBalancer = require('./LoadBalancer')

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
            res.send(`Hello from server ${serverNum}!`);
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


let loadBalancer = LoadBalancer.getInstance();

loadBalancer.addDatabase('3001');
loadBalancer.addDatabase('3000');

loadBalancer.sendQuery('dfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjas');
loadBalancer.sendQuery('dfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjas');
loadBalancer.sendQuery('dfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjas');
loadBalancer.sendQuery('dfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjas');
loadBalancer.sendQuery('dfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjas');
loadBalancer.sendQuery('dfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjas');
loadBalancer.sendQuery('dfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjas');
loadBalancer.sendQuery('dfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjas');
loadBalancer.sendQuery('dfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjas');
loadBalancer.sendQuery('dfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjas');
loadBalancer.sendQuery('dfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjasdfkjas');
loadBalancer.sendQuery('1111232131412310784-034444444444444444444444444444444444175-273523=75-847-325784-72354873');