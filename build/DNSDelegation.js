"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var LoadBalancingStrategy_1 = require("./LoadBalancingStrategy");
var LoadBalancer_1 = __importDefault(require("./LoadBalancer"));
var fetch = require('node-fetch');
var DNSDelegation = /** @class */ (function (_super) {
    __extends(DNSDelegation, _super);
    function DNSDelegation() {
        var _this = _super.call(this) || this;
        _this.loadBalancer = LoadBalancer_1.default.getInstance();
        return _this;
    }
    DNSDelegation.prototype.manageQueries = function () {
        var _this = this;
        if (!this.loadBalancer || this.loadBalancer.activeDatabaseCount < this.loadBalancer.databaseCount)
            return;
        var query = this.loadBalancer.queryList[0];
        if (!query)
            return;
        if (query.type === 'modify') {
            clearInterval(this.intervalID);
            this.loadBalancer.activeDatabaseCount = 0;
            this.loadBalancer.databases.forEach(function (e) { return e.sendQuery(query); });
            this.loadBalancer.queryList.shift();
            return;
        }
        else {
            this.loadBalancer.databases.forEach(function (e) { return _this.checkHealth(e); });
            this.loadBalancer.databases[0].sendQuery(query);
            this.loadBalancer.queryList.shift(); // this was probably lacking
        }
    };
    DNSDelegation.prototype.sortDatabasesByAccesability = function () {
        this.loadBalancer.databases = this.loadBalancer.databases.sort(function (a, b) { return a.lastTimeResponse - b.lastTimeResponse; });
    };
    DNSDelegation.prototype.checkHealth = function (db) {
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
            }
            _this.sortDatabasesByAccesability();
        });
    };
    return DNSDelegation;
}(LoadBalancingStrategy_1.LoadBalancingStrategy));
exports.default = DNSDelegation;
