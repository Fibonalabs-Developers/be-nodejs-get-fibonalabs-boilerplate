"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var template_repos_1 = __importDefault(require("../data/template-repos"));
var parseTemplateURL = function (name) {
    if (name in template_repos_1.default) {
        return {
            name: name,
            repo: name,
            url: template_repos_1.default[name],
        };
    }
    throw new Error('Invalid Template');
};
exports.default = parseTemplateURL;
