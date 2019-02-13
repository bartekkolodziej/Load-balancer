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
Object.defineProperty(exports, "__esModule", { value: true });
var LoadBalancingStrategy_1 = require("./LoadBalancingStrategy");
var RequestCounting = /** @class */ (function (_super) {
    __extends(RequestCounting, _super);
    function RequestCounting() {
        return _super.call(this) || this;
    }
    RequestCounting.prototype.manageQueries = function () {
        if (this.loadBalancer.activeDatabaseCount < this.loadBalancer.databaseCount)
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
            this.manageNotModifyingQueries();
        }
    };
    RequestCounting.prototype.manageNotModifyingQueries = function () {
        var notModifyingQueries = [];
        for (var _i = 0, _a = this.loadBalancer.queryList; _i < _a.length; _i++) {
            var q = _a[_i];
            if (q.type !== 'modify') {
                var shiftVal_1 = this.loadBalancer.queryList.shift();
                if (shiftVal_1)
                    notModifyingQueries.push(shiftVal_1);
            }
            else
                break;
        }
        //narazie ten algorytm zakłada że współczynnik udziału jest równy i rozdziela po równo zapytania
        var shiftVal;
        while (notModifyingQueries.length !== 0) {
            shiftVal = notModifyingQueries.shift();
            if (shiftVal) {
                this.loadBalancer.databases.forEach(function (db) { return db.sendQuery(shiftVal); });
            }
        }
    };
    return RequestCounting;
}(LoadBalancingStrategy_1.LoadBalancingStrategy));
exports.default = RequestCounting;
