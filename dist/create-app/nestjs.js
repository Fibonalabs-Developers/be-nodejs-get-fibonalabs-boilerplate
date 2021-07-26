"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
var path_1 = __importDefault(require("path"));
var chalk_1 = __importDefault(require("chalk"));
var should_use_yarn_1 = require("../utils/should-use-yarn");
var is_writeable_1 = require("../utils/is-writeable");
var clone_1 = __importDefault(require("../utils/clone"));
var install_1 = require("../utils/install");
var run_1 = __importDefault(require("../utils/run"));
var fs_1 = __importDefault(require("fs"));
var os_1 = __importDefault(require("os"));
function createApp(_a) {
    var appPath = _a.appPath, useNpm = _a.useNpm, template = _a.template, database = _a.database;
    return __awaiter(this, void 0, void 0, function () {
        var root, appName, useYarn, displayedCommand, originalDirectory, repoUrl, packageJson, cdpath;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    root = path_1.default.resolve(appPath);
                    appName = path_1.default.basename(root);
                    useYarn = useNpm ? false : should_use_yarn_1.shouldUseYarn();
                    displayedCommand = useYarn ? "yarn" : "npm";
                    originalDirectory = process.cwd();
                    if (!["mysql", "postgresql"].includes(database)) {
                        console.error("No configuration found for " + chalk_1.default.red(database));
                        process.exit(1);
                    }
                    return [4 /*yield*/, is_writeable_1.isWriteable(path_1.default.dirname(root))];
                case 1:
                    if (!(_b.sent())) {
                        console.error("The application path is not writable, please check folder permissions and try again.");
                        console.error("It is likely you do not have write permissions for this folder.");
                        process.exit(1);
                    }
                    //   if (!isFolderEmpty(root, appName)) {
                    //     process.exit(1);
                    //   }
                    console.log();
                    console.log("Creating a new Fibanolabs app in " + chalk_1.default.green(root) + ".");
                    console.log();
                    try {
                        repoUrl = void 0;
                        try {
                            repoUrl = new URL(template.url);
                        }
                        catch (error) {
                            if (error.code !== "ERR_INVALID_URL") {
                                console.error(error);
                                process.exit(1);
                            }
                        }
                        if (repoUrl) {
                            console.log("Downloading files from repo " + chalk_1.default.cyan(template.repo) + ". This might take a moment.");
                            console.log();
                            clone_1.default(appName, repoUrl.toString());
                        }
                        else {
                            console.log("No URL Found");
                            process.exit(1);
                        }
                    }
                    catch (reason) {
                        //   throw new DownloadError(reason);
                        console.error(reason);
                        process.exit(1);
                    }
                    process.chdir(root);
                    run_1.default("git", ["init", "-q"]);
                    console.log();
                    console.log("Installing packages. This might take a couple of minutes.");
                    console.log();
                    return [4 /*yield*/, install_1.install(root, null, { useYarn: useYarn })];
                case 2:
                    _b.sent();
                    packageJson = JSON.parse(fs_1.default.readFileSync(path_1.default.join(root, "package.json"), "utf8"));
                    packageJson = __assign(__assign({}, packageJson), { name: appName });
                    fs_1.default.writeFileSync(path_1.default.join(root, "package.json"), JSON.stringify(packageJson, null, 2) + os_1.default.EOL);
                    if (path_1.default.join(originalDirectory, appName) === appPath) {
                        cdpath = appName;
                    }
                    else {
                        cdpath = appPath;
                    }
                    console.log();
                    console.log(chalk_1.default.green("Success!") + " Created " + appName + " at " + appPath);
                    console.log("Inside that directory, you can run several commands:");
                    console.log();
                    console.log("We suggest that you begin by typing:");
                    console.log();
                    console.log(chalk_1.default.cyan("  cd"), cdpath);
                    console.log("  " + chalk_1.default.cyan(displayedCommand + " " + (useYarn ? "" : "run ") + "start:dev"));
                    console.log();
                    return [2 /*return*/];
            }
        });
    });
}
exports.createApp = createApp;
