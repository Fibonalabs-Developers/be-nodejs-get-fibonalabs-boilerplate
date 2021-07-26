"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var run_1 = __importDefault(require("./run"));
var clone = function (dest, url) {
    try {
        var cmd = run_1.default('git', ['clone', '--depth=1', url, dest]);
        if (cmd.status == 0) {
            run_1.default('rm', ['-rf', dest + "/.git"]);
            return true;
        }
        return false;
    }
    catch (error) {
        throw new Error(error.toString());
    }
};
exports.default = clone;
