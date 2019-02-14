"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Database_fake_1 = __importDefault(require("./Database.fake"));
var DNSDelegation_1 = __importDefault(require("./DNSDelegation"));
var RoundRobinDNS_1 = __importDefault(require("./RoundRobinDNS"));
var RequestCounting_1 = __importDefault(require("./RequestCounting"));
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
            this.strategy = new DNSDelegation_1.default();
        else if (strategy === 'RoundRobinDNS')
            this.strategy = new RoundRobinDNS_1.default();
        else if (strategy === 'RequestCounting')
            this.strategy = new RequestCounting_1.default();
    };
    LoadBalancer.prototype.addDatabase = function (options) {
        this.databases.push(new Database_fake_1.default(options));
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
    LoadBalancer.prototype.sendQuery = function (query, callback, databasePort) {
        if (callback === void 0) { callback = function (res) { }; }
        if (databasePort === void 0) { databasePort = ''; }
        var type = LoadBalancer.getQueryType(query);
        this.queryList.push({ query: query, type: type, databasePort: databasePort, callback: callback });
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
    LoadBalancer.prototype.setActiveDatabaseCount = function () {
        this.activeDatabaseCount++;
        this.strategy.notifyAboutActiveDB();
    };
    return LoadBalancer;
}());
exports.default = LoadBalancer;
module.exports = {
    LoadBalancer: LoadBalancer
};
