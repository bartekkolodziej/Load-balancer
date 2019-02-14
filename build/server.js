var express = require('express');
var LoadBalancer = require('./LoadBalancer').LoadBalancer;
var app1 = express();
var loadBalancer = LoadBalancer.getInstance();
loadBalancer.setStrategy('DNSDelegation');
loadBalancer.addDatabase({ port: '1000', userName: 'asd', password: 'ad', databaseName: 'db' });
loadBalancer.addDatabase({ port: '1001', userName: 'asd1', password: 'asd1', databaseName: 'db1' });
loadBalancer.addDatabase({ port: '1002', userName: 'asd2', password: 'asd2', databaseName: 'db2' });
loadBalancer.addDatabase({ port: '1003', userName: 'asd3', password: 'asd3', databaseName: 'db3' });
loadBalancer.addDatabase({ port: '1004', userName: 'asd3', password: 'asd3', databaseName: 'db3' });
loadBalancer.addDatabase({ port: '1005', userName: 'asd3', password: 'asd3', databaseName: 'db3' });
loadBalancer.addDatabase({ port: '1006', userName: 'asd3', password: 'asd3', databaseName: 'db3' });
loadBalancer.addDatabase({ port: '1007', userName: 'asd3', password: 'asd3', databaseName: 'db3' });
loadBalancer.addDatabase({ port: '1008', userName: 'asd3', password: 'asd3', databaseName: 'db3' });
loadBalancer.addDatabase({ port: '1009', userName: 'asd3', password: 'asd3', databaseName: 'db3' });
var i = 0;
while (i < 100) {
    loadBalancer.sendQuery("SELECT * from table", function (res) {
        console.log(res);
    });
    if (i === 50)
        loadBalancer.sendQuery("DROP");
    i++;
}
loadBalancer.sendQuery("DELETE");
