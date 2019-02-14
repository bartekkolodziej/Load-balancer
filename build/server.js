var body = require('body-parser');
var express = require('express');
// require('typescript-require');
// const {LoadBalancer} = require('./LoadBalancer.js');
var LoadBalancer = require('./LoadBalancer').LoadBalancer;
var app1 = express();
var app2 = express();
var port1 = 3000;
var port2 = 3001;
// Parse the request body as JSON
app1.use(body.json());
app2.use(body.json());
var handler = function (serverNum) { return function (req, res) {
    console.log("server " + serverNum, req.method, req.url, req.body);
    if (serverNum === 1) {
        setTimeout(function () {
            console.log('settimeout finished');
            res.send("Hello from server " + serverNum + "!");
        }, 3000);
    }
    else {
        res.send("Hello from server " + serverNum + "!");
    }
}; };
// Only handle GET and POST requests
app1.get('*', handler(1)).post('*', handler(1));
app2.get('*', handler(2)).post('*', handler(2));
app1.listen(port1, function (err) {
    if (err) {
        console.log(err);
    }
    else {
        // console.log(`http://localhost:${port1}/world`);
    }
});
app2.listen(port2, function (err) {
    if (err) {
        console.log(err);
    }
    else {
        // console.log(`http://localhost:${port2}/hello`);
    }
});
//1 przykladowe uzycie
var callback = function (res) {
    console.log(res);
};
var loadBalancer = LoadBalancer.getInstance();
loadBalancer.setStrategy('DNSDelegation');
loadBalancer.addDatabase({ port: '1000', userName: 'asd', password: 'ad', databaseName: 'db' });
loadBalancer.addDatabase({ port: '1001', userName: 'asd1', password: 'asd1', databaseName: 'db1' });
loadBalancer.addDatabase({ port: '1002', userName: 'asd2', password: 'asd2', databaseName: 'db2' });
loadBalancer.addDatabase({ port: '1003', userName: 'asd3', password: 'asd3', databaseName: 'db3' });
loadBalancer.sendQuery("SELECT * from table", function (res) {
    console.log(res);
});
loadBalancer.sendQuery("SELECT * from table", function (res) {
    console.log(res);
});
loadBalancer.sendQuery("SELECT * from table", function (res) {
    console.log(res);
});
loadBalancer.sendQuery("SELECT * from table", function (res) {
    console.log(res);
});
loadBalancer.sendQuery("SELECT * from table", function (res) {
    console.log(res);
});
loadBalancer.sendQuery("SELECT * from table", function (res) {
    console.log(res);
});
loadBalancer.sendQuery("DELETE wszystko nieznam sql xD from table");
