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
var RequestCounting = /** @class */ (function (_super) {
    __extends(RequestCounting, _super);
    function RequestCounting() {
        return _super.call(this) || this;
    }
    RequestCounting.prototype.manageQueries = function () {
        if (LoadBalancer_1.default.getInstance().activeDatabaseCount < LoadBalancer_1.default.getInstance().databaseCount)
            return;
        var query = LoadBalancer_1.default.getInstance().queryList[0];
        if (!query)
            return;
        if (query.type === 'modify') {
            clearInterval(this.intervalID);
            LoadBalancer_1.default.getInstance().activeDatabaseCount = 0;
            LoadBalancer_1.default.getInstance().databases.forEach(function (e) { return e.sendQuery(query); });
            LoadBalancer_1.default.getInstance().queryList.shift();
            return;
        }
        else {
            RequestCounting.manageNotModifyingQueries();
        }
    };
    RequestCounting.manageNotModifyingQueries = function () {
        var notModifyingQueries = [];
        for (var _i = 0, _a = LoadBalancer_1.default.getInstance().queryList; _i < _a.length; _i++) {
            var q = _a[_i];
            if (q.type !== 'modify') {
                var shiftVal = LoadBalancer_1.default.getInstance().queryList.shift();
                if (shiftVal)
                    notModifyingQueries.push(shiftVal);
            }
            else
                break;
        }
        //narazie ten algorytm zakłada że współczynnik udziału jest równy i rozdziela po równo zapytania
        var queryPerDB = Math.ceil(notModifyingQueries.length / LoadBalancer_1.default.getInstance().databaseCount);
        LoadBalancer_1.default.getInstance().databases.forEach(function (db) {
            for (var i = 0; i < queryPerDB; i++) {
                var shiftVal = notModifyingQueries.shift();
                if (shiftVal)
                    db.sendQuery(shiftVal);
            }
        });
    };
    return RequestCounting;
}(LoadBalancingStrategy_1.LoadBalancingStrategy));
exports.default = RequestCounting;
