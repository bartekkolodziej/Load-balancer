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
exports.__esModule = true;
var LoadBalancingStrategy_1 = require("./LoadBalancingStrategy");
var LoadBalancer_1 = require("./LoadBalancer");
var RoundRobinDNS = /** @class */ (function (_super) {
    __extends(RoundRobinDNS, _super);
    function RoundRobinDNS() {
        return _super.call(this) || this;
    }
    RoundRobinDNS.prototype.manageQueries = function () {
        if (LoadBalancer_1["default"].getInstance().activeDatabaseCount < LoadBalancer_1["default"].getInstance().databaseCount)
            return;
        var query = LoadBalancer_1["default"].getInstance().queryList[0];
        if (!query)
            return;
        if (query.type === 'modify') {
            clearInterval(this.intervalID);
            LoadBalancer_1["default"].getInstance().activeDatabaseCount = 0;
            LoadBalancer_1["default"].getInstance().databases.forEach(function (e) { return e.sendQuery(query); });
            LoadBalancer_1["default"].getInstance().queryList.shift();
            return;
        }
        else {
            var database = LoadBalancer_1["default"].getInstance().databases.find(function (db) { return db.port === query.databasePort; });
            if (database) {
                database.sendQuery(query);
                LoadBalancer_1["default"].getInstance().queryList.shift();
            }
        }
    };
    return RoundRobinDNS;
}(LoadBalancingStrategy_1.LoadBalancingStrategy));
exports["default"] = RoundRobinDNS;
