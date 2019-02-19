"use strict";
exports.__esModule = true;
var Database_1 = require("./Database");
var DNSDelegation_1 = require("./DNSDelegation");
var RoundRobinDNS_1 = require("./RoundRobinDNS");
var RequestCounting_1 = require("./RequestCounting");
var LoadBalancer = /** @class */ (function () {
    function LoadBalancer() {
        this.databaseCount = 0;
        this.activeDatabaseCount = 0;
        this.databases = [];
        this.queryList = [];
    }
    LoadBalancer.getInstance = function () {
        if (!LoadBalancer.instance)
            LoadBalancer.instance = new LoadBalancer();
        return LoadBalancer.instance;
    };
    LoadBalancer.prototype.setStrategy = function (strategy) {
        if (strategy === 'DNSDelegation')
            this.strategy = new DNSDelegation_1["default"]();
        else if (strategy === 'RoundRobinDNS')
            this.strategy = new RoundRobinDNS_1["default"]();
        else if (strategy === 'RequestCounting')
            this.strategy = new RequestCounting_1["default"]();
    };
    LoadBalancer.prototype.addDatabase = function (options) {
        this.databases.push(new Database_1["default"](options));
        this.databaseCount++;
        this.activeDatabaseCount++;
    };
    LoadBalancer.prototype.deleteDatabase = function (port) {
        var filteredDatabases = this.databases.filter(function (e) { return e.port !== port; });
        if (filteredDatabases === this.databases)
            return false;
        else {
            this.databases = filteredDatabases;
            this.databaseCount--;
            return true;
        }
    };
    LoadBalancer.prototype.sendQuery = function (query, parameters, callback, databasePort) {
        if (callback === void 0) { callback = function (res) { }; }
        if (databasePort === void 0) { databasePort = null; }
        var type = LoadBalancer.getQueryType(query);
        this.queryList.push({ query: query, parameters: parameters, type: type, databasePort: databasePort, callback: callback });
    };
    LoadBalancer.getQueryType = function (query) {
        query = query.toUpperCase();
        if (query.includes('DELETE') ||
            query.includes('UPDATE') ||
            query.includes('CREATE') ||
            query.includes('DROP') ||
            query.includes('INSERT'))
            return 'modify';
        else
            return 'not-modify';
    };
    LoadBalancer.prototype.setError = function () {
        this.strategy.error = 1;
    };
    LoadBalancer.prototype.setActiveDatabaseCount = function () {
        this.activeDatabaseCount++;
        this.strategy.notifyAboutActiveDB();
    };
    return LoadBalancer;
}());
exports["default"] = LoadBalancer;
module.exports = {
    LoadBalancer: LoadBalancer
};
