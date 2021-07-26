"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var run = function (cmd, args) {
    return child_process_1.spawnSync(cmd, args, { stdio: "inherit" });
};
exports.default = run;
