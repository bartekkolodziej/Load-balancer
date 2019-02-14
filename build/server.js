var body = require('body-parser');
var express = require('express');
var LoadBalancer = require('./LoadBalancer').LoadBalancer;
var app = express();
var asciichart = require('asciichart');
var port1 = 3000;
app.use(body.json());
var handler = function () { return function (req, res) {
    res.send("Ok");
}; };
// Only handle GET and POST requests
app.get('*', handler()).post('*', handler());
app.listen(port1, function (err) {
    if (err) {
        console.log(err);
    }
    else {
        // console.log(`http://localhost:${port1}/world`);
    }
});
var loadBalancer = LoadBalancer.getInstance();
loadBalancer.setStrategy('RequestCounting');
loadBalancer.addDatabase({ port: '1000', userName: 'asd', password: 'ad', databaseName: 'db' });
loadBalancer.addDatabase({ port: '1001', userName: 'asd1', password: 'asd1', databaseName: 'db1' });
loadBalancer.addDatabase({ port: '1002', userName: 'asd2', password: 'asd2', databaseName: 'db2' });
loadBalancer.addDatabase({ port: '1003', userName: 'asd3', password: 'asd3', databaseName: 'db3' });
// results rendering
var i = 0;
var serverNumber;
var s0 = [];
var limit = 200;
while (i < limit) {
    loadBalancer.sendQuery("SELECT * from table", function (res) {
        serverNumber = res.success[res.success.length - 1];
        s0.push(serverNumber);
        console.log(res);
    });
    i++;
}
var intervalID = setInterval(function () {
    if (s0.length == limit) {
        console.log(asciichart.plot(s0));
        clearInterval(intervalID);
    }
}, 2000);
// end of results rendering
loadBalancer.sendQuery("DELETE wszystko nieznam sql xD from table");
