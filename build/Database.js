"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var LoadBalancer_1 = __importDefault(require("./LoadBalancer"));
var fetch = require('node-fetch');
var Database = /** @class */ (function () {
    function Database(options) {
        this.loadBalancer = LoadBalancer_1.default.getInstance();
        this.port = options.port;
        this.active = true;
        this.lastTimeResponse = 0;
        this.queryRate = 1; // wtf is this? passed 1 as default but not sure if it works
    }
    Database.prototype.sendQuery = function (query) {
        var _this = this;
        if (query.type === 'modify') {
            fetch('localhost:' + this.port, { method: 'POST', body: query.query })
                .then(function (res) { return res.json(); })
                .then(function (json) {
                _this.loadBalancer.setActiveDatabaseCount();
                query.callback(json);
            });
        }
        else {
            fetch('localhost:' + this.port, { method: 'POST', body: query.query })
                .then(function (res) { return res.json(); })
                .then(function (json) { return query.callback(json); });
        }
    };
    return Database;
}());
exports.default = Database;
