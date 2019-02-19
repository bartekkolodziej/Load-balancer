"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var LoadBalancer_1 = __importDefault(require("./LoadBalancer"));
var pgp = require('pg-promise')( /*options*/);
var Database = /** @class */ (function () {
    function Database(options) {
        this.loadBalancer = LoadBalancer_1.default.getInstance();
        var cn = {
            host: 'localhost',
            port: options.port,
            database: options.databaseName,
            user: options.userName,
            password: options.password
        };
        this.loadBalancer = LoadBalancer_1.default.getInstance();
        this.db = pgp(cn);
        this.userName = options.userName;
        this.databaseName = options.databaseName;
        this.password = options.password;
        this.port = options.port;
        this.active = true;
        this.lastTimeResponse = 0;
        this.queryRate = 1;
    }
    Database.prototype.finalise = function (str) {
        this.db.none(str, []);
        console.log(str);
    };
    Database.prototype.sendQuery = function (query) {
        var _this = this;
        if (query.type === 'modify') {
            this.db.none("BEGIN;" + query.query, query.parameters)
                .then(function (json) {
                _this.loadBalancer.setActiveDatabaseCount();
            })
                .catch(function (error) {
                _this.loadBalancer.setError();
                _this.loadBalancer.setActiveDatabaseCount();
                console.log('ERROR:', error);
            });
        }
        else {
            this.db.any(query.query, query.parameters)
                .then(function (json) {
                query.callback(json);
            })
                .catch(function (error) {
                console.log('ERROR:', error);
            });
        }
    };
    return Database;
}());
exports.default = Database;
