"use strict";
exports.__esModule = true;
var Database_1 = require("./Database");
var timers_1 = require("timers");
var fetch = require('node-fetch');
var LoadBalancer = /** @class */ (function () {
    function LoadBalancer() {
        LoadBalancer.instance = this;
        timers_1.setInterval(this.manageQueries, 100);
    }
    LoadBalancer.getInstance = function () {
        return LoadBalancer.instance;
    };
    LoadBalancer.prototype.addDatabase = function (port) {
        this.databases.push(new Database_1["default"](port));
    };
    LoadBalancer.prototype.deleteDatabase = function (port) {
        var filteredDatabases = this.databases.filter(function (e) { return e.port !== port; });
        if (filteredDatabases === this.databases)
            return false;
        else {
            this.databases = filteredDatabases;
            return true;
        }
    };
    LoadBalancer.prototype.sendQuery = function (query) {
        this.queryList.push(query);
    };
    LoadBalancer.prototype.checkHealth = function (db) {
        var _this = this;
        var t1 = new Date().getMilliseconds();
        fetch('localhost:' + db.port, { timeout: 2000 }, function (res) {
            if (res.statusCode < 200 || res.statusCode > 299) {
                db.active = false;
                db.lastTimeResponse = 999999;
            }
            else {
                db.active = true;
                db.lastTimeResponse = new Date().getMilliseconds() - t1;
                console.log('Last time response', db.lastTimeResponse);
            }
            _this.sortDatabasesByAccesability();
        });
    };
    LoadBalancer.prototype.manageQueries = function () {
        var database = this.findSuitableDatabase();
        if (database !== undefined) {
            database.sendQuery(this.queryList[0]);
            this.checkHealth(database);
            this.queryList.shift();
        }
    };
    LoadBalancer.prototype.findSuitableDatabase = function () {
        if (this.databases[0].active)
            return this.databases[0];
    };
    LoadBalancer.prototype.sortDatabasesByAccesability = function () {
        this.databases = this.databases.sort(function (a, b) { return a.lastTimeResponse - b.lastTimeResponse; });
    };
    LoadBalancer.instance = new LoadBalancer();
    return LoadBalancer;
}());
exports["default"] = LoadBalancer;
