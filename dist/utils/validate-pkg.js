"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNpmName = void 0;
var validate_npm_package_name_1 = __importDefault(require("validate-npm-package-name"));
function validateNpmName(name) {
    var nameValidation = validate_npm_package_name_1.default(name);
    if (nameValidation.validForNewPackages) {
        return { valid: true };
    }
    return {
        valid: false,
        problems: __spreadArray(__spreadArray([], (nameValidation.errors || [])), (nameValidation.warnings || [])),
    };
}
exports.validateNpmName = validateNpmName;
