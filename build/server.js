var body = require('body-parser');
var express = require('express');
var LoadBalancer = require('./LoadBalancer').LoadBalancer;
var app = express();
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
loadBalancer.setStrategy('DNSDelegation');
loadBalancer.addDatabase({ port: '1000', userName: 'asd', password: 'ad', databaseName: 'db' });
loadBalancer.addDatabase({ port: '1001', userName: 'asd1', password: 'asd1', databaseName: 'db1' });
loadBalancer.addDatabase({ port: '1002', userName: 'asd2', password: 'asd2', databaseName: 'db2' });
loadBalancer.addDatabase({ port: '1003', userName: 'asd3', password: 'asd3', databaseName: 'db3' });
var i = 0;
while (i < 1000) {
    loadBalancer.sendQuery("SELECT * from table", function (res) {
        console.log(res);
    });
    i++;
}
loadBalancer.sendQuery("DELETE wszystko nieznam sql xD from table");
