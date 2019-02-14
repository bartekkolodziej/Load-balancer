"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var LoadBalancer_1 = __importDefault(require("./LoadBalancer"));
var fetch = require('node-fetch');
var pgp = require('pg-promise');
var Database = /** @class */ (function () {
    function Database(options) {
        this.loadBalancer = LoadBalancer_1.default.getInstance();
        this.userName = options.userName;
        this.databaseName = options.databaseName;
        this.password = options.password;
        this.port = options.port;
        this.active = true;
        this.lastTimeResponse = 0;
        this.queryRate = 1; // wtf is this? passed 1 as default but not sure if it works
    }
    Database.prototype.sendQuery = function (query) {
        var _this = this;
        console.log('czy wypisze?');
        var db = pgp('postgres://' + this.userName + ':' + this.password + '@host:' + this.port + '/' + this.databaseName);
        if (query.type === 'modify') {
            db.one(query.query, 123)
                .then(function (res) { return res.json(); })
                .then(function (json) {
                _this.loadBalancer.setActiveDatabaseCount();
                query.callback(json);
            })
                .catch(function (error) {
                console.log('ERROR:', error);
            });
        }
        else {
            db.one(query.query, 123)
                .then(function (res) { return res.json(); })
                .then(function (json) { return query.callback(json); })
                .catch(function (error) {
                console.log('ERROR:', error);
            });
        }
        /*
        console.log('tutaj jestem')
        if(query.type === 'modify'){
            fetch("http://localhost:3000/world", {method: 'POST', body: query.query})
                .then((res: any) => res.json())
                .then((json: any) => {
                    this.loadBalancer.setActiveDatabaseCount();
                    query.callback(json);
                })
        }else{
            fetch("http://localhost:3000/world", {method: 'POST', body: query.query})
                .then((res: any) => res.json())
                .then((json: any) => query.callback(json))
        }
        */
    };
    return Database;
}());
exports.default = Database;
