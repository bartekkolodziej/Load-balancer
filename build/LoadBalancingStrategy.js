"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var LoadBalancer_1 = __importDefault(require("./LoadBalancer"));
// const LoadBalancer = require('./LoadBalancer.ts').LoadBalancer;
var timers_1 = require("timers");
var LoadBalancingStrategy = /** @class */ (function () {
    function LoadBalancingStrategy() {
<<<<<<< HEAD
        this.intervalID = setTimeout(this.manageQueries, 500);
    }
    LoadBalancingStrategy.prototype.sendQuery = function (query, callback, databasePort) {
        if (databasePort === void 0) { databasePort = ''; }
        console.log('hit');
        var type = LoadBalancer_1.default.getQueryType(query);
        LoadBalancer_1.default.getInstance().queryList.push({ query: query, type: type, databasePort: databasePort, callback: callback });
    };
=======
        this.intervalID = timers_1.setInterval(this.manageQueries, 500);
    }
>>>>>>> origin/master
    LoadBalancingStrategy.prototype.notifyAboutActiveDB = function () {
        if (LoadBalancer_1.default.getInstance().activeDatabaseCount >= LoadBalancer_1.default.getInstance().databaseCount)
            this.intervalID = timers_1.setInterval(this.manageQueries, 100);
    };
    return LoadBalancingStrategy;
}());
exports.LoadBalancingStrategy = LoadBalancingStrategy;
