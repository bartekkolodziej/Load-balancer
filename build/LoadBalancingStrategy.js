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
        this.intervalID = timers_1.setInterval(this.manageQueries, 100);
    }
    LoadBalancingStrategy.prototype.notifyAboutActiveDB = function () {
        if (LoadBalancer_1.default.getInstance().activeDatabaseCount >= LoadBalancer_1.default.getInstance().databaseCount)
            this.intervalID = timers_1.setInterval(this.manageQueries, 100);
    };
    return LoadBalancingStrategy;
}());
exports.LoadBalancingStrategy = LoadBalancingStrategy;
