const express = require('express');

const port0 = 1000;
const port1 = 1001;
const port2 = 1002;
const port3 = 1003;

const app0 = express();
const app1 = express();
const app2 = express();
const app3 = express();

const body = require('body-parser');

app0.use(body.json());
app1.use(body.json());
app2.use(body.json());
app3.use(body.json());

const handler = (serverNo) => (req, res) => {
    // if (serverNo == 0) setTimeout(() => {
    //     console.log(`incoming request ...`);
    //     const json = {};
    //     json['success'] = `response from server #${serverNo}`;
    //     res.send(json);
    // }, 5000);
    // else {
        console.log(`incoming request ...`);
        const json = {};
        json['success'] = `response from server #${serverNo}`;
        res.send(json);
    // }
};

app0.get('*', handler(0)).post('*', handler(0));
app1.get('*', handler(1)).post('*', handler(1));
app2.get('*', handler(2)).post('*', handler(2));
app3.get('*', handler(3)).post('*', handler(3));


app0.listen(port0, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`http://localhost:${port0}`);
    }
});
app1.listen(port1, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`http://localhost:${port1}`);
    }
});
app2.listen(port2, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`http://localhost:${port2}`);
    }
});
app3.listen(port3, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`http://localhost:${port3}`);
    }
});