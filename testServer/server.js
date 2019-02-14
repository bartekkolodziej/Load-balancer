const express = require('express');

const port0 = 1000;
const port1 = 1001;
const port2 = 1002;
const port3 = 1003;
const port4 = 1004;
const port5 = 1005;
const port6 = 1006;
const port7 = 1007;
const port8 = 1008;
const port9 = 1009;

const app0 = express();
const app1 = express();
const app2 = express();
const app3 = express();
const app4 = express();
const app5 = express();
const app6 = express();
const app7 = express();
const app8 = express();
const app9 = express();

const body = require('body-parser');

app0.use(body.json());
app1.use(body.json());
app2.use(body.json());
app3.use(body.json());
app4.use(body.json());
app5.use(body.json());
app6.use(body.json());
app7.use(body.json());
app8.use(body.json());
app9.use(body.json());

const handler = (serverNo) => (req, res) => {
    // if (serverNo == 0) return res.status(503).end(); // <=== jak to otkomentujesz to zakonczy request i wyjebie blad w konsoli
    console.log(`incoming request ...`, req.body, '\n');
    const json = {};
    json['success'] = `response from server #${serverNo}`;
    setTimeout(() => res.send(json), 123);
};

const setHeader = (req, res, next) => {
    const origin = req.get('origin');

    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma');

    req.method === 'OPTIONS' ? res.sendStatus(204) : next();
}

app0.use((req, res, next) => {
    setHeader(req, res, next);
});
app1.use((req, res, next) => {
    setHeader(req, res, next);
});
app2.use((req, res, next) => {
    setHeader(req, res, next);
});
app3.use((req, res, next) => {
    setHeader(req, res, next);
});
app4.use((req, res, next) => {
    setHeader(req, res, next);
});
app5.use((req, res, next) => {
    setHeader(req, res, next);
});
app6.use((req, res, next) => {
    setHeader(req, res, next);
});
app7.use((req, res, next) => {
    setHeader(req, res, next);
});
app8.use((req, res, next) => {
    setHeader(req, res, next);
});
app9.use((req, res, next) => {
    setHeader(req, res, next);
});



app0.get('*', handler(0)).post('*', handler(0));
app1.get('*', handler(1)).post('*', handler(1));
app2.get('*', handler(2)).post('*', handler(2));
app3.get('*', handler(3)).post('*', handler(3));
app4.get('*', handler(4)).post('*', handler(4));
app5.get('*', handler(5)).post('*', handler(5));
app6.get('*', handler(6)).post('*', handler(6));
app7.get('*', handler(7)).post('*', handler(7));
app8.get('*', handler(8)).post('*', handler(8));
app9.get('*', handler(9)).post('*', handler(9));



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
app4.listen(port4, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`http://localhost:${port4}`);
    }
});
app5.listen(port5, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`http://localhost:${port5}`);
    }
});
app6.listen(port6, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`http://localhost:${port6}`);
    }
});
app7.listen(port7, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`http://localhost:${port7}`);
    }
});
app8.listen(port8, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`http://localhost:${port8}`);
    }
});
app9.listen(port9, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`http://localhost:${port9}`);
    }
});