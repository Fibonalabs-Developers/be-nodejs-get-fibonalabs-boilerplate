"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shouldUseYarn = void 0;
var child_process_1 = require("child_process");
function shouldUseYarn() {
    try {
        var userAgent = process.env.npm_config_user_agent;
        if (userAgent) {
            return Boolean(userAgent && userAgent.startsWith("yarn"));
        }
        child_process_1.execSync("yarnpkg --version", { stdio: "ignore" });
        return true;
    }
    catch (e) {
        return false;
    }
}
exports.shouldUseYarn = shouldUseYarn;
