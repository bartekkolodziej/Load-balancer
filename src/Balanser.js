"use strict";
exports.__esModule = true;
var LoadBalancer = require("./LoadBalancer").LoadBalancer;
var Balanser = /** @class */ (function () {
    function Balanser() {
        LoadBalancer.getInstance();
        this.setStrategy('DNSDelegation');
    }
    Balanser.prototype.setStrategy = function (strategy) {
        LoadBalancer.getInstance().setStrategy(strategy);
    };
    Balanser.prototype.sendQuery = function (query, parameters, callback, databasePort) {
        if (callback === void 0) { callback = function (res) { }; }
        if (databasePort === void 0) { databasePort = ''; }
        LoadBalancer.getInstance().sendQuery(query, parameters, callback, databasePort);
    };
    Balanser.prototype.addDatabase = function (options) {
        LoadBalancer.getInstance().addDatabase(options);
    };
    Balanser.prototype.deleteDatabase = function (port) {
        return LoadBalancer.getInstance().deleteDatabase(port);
    };
    return Balanser;
}());
exports["default"] = Balanser;
