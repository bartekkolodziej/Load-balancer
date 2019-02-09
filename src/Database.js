"use strict";
exports.__esModule = true;
var fetch = require('node-fetch');
var Database = /** @class */ (function () {
    function Database(port) {
        this.port = port;
        this.active = true;
        this.lastTimeResponse = 0;
    }
    Database.prototype.sendQuery = function (query) {
        fetch('localhost:' + this.port, { method: 'POST', body: query })
            .then(function (res) { return res.json(); })
            .then(function (json) { return console.log(json); });
    };
    return Database;
}());
exports["default"] = Database;
