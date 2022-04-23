"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const moment_1 = __importDefault(require("moment"));
const util_1 = __importDefault(require("util"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
var WriteTypes;
(function (WriteTypes) {
    WriteTypes["Error"] = "error";
    WriteTypes["Info"] = "info";
    WriteTypes["Test"] = "test";
    WriteTypes["Warn"] = "warn";
})(WriteTypes || (WriteTypes = {}));
// TODO: performance improvement.
class Logger {
    static success(message, ..._message) {
        return console.log(`[${chalk_1.default.green("SUCCESS")}] ${chalk_1.default.bold.black((0, moment_1.default)().format("HH:MM:SS"))} ${util_1.default.format(message)} ${util_1.default.format(..._message)}`);
    }
    static error(message, ..._message) {
        return console.log(`[${chalk_1.default.red("ERROR")}] ${chalk_1.default.bold.black((0, moment_1.default)().format("HH:MM:SS"))} ${util_1.default.format(message)} ${util_1.default.format(..._message)}`);
    }
    static info(message, ..._message) {
        return console.log(`[${chalk_1.default.cyan("INFO")}] ${chalk_1.default.bold.black((0, moment_1.default)().format("HH:MM:SS"))} ${util_1.default.format(message)} ${util_1.default.format(..._message)}`);
    }
    static test(message, ..._message) {
        return console.log(`[${chalk_1.default.yellow("TEST")}] ${chalk_1.default.bold.black((0, moment_1.default)().format("HH:MM:SS"))} ${util_1.default.format(message)} ${util_1.default.format(..._message)}`);
    }
    static async write(mode = WriteTypes.Error, message, ..._message) {
        const stream = await fs_1.default.createWriteStream(path_1.default.join(__dirname, `../../logs/${mode}_${(0, moment_1.default)().format("YYYY-MM-DD")}.log`), { encoding: "utf-8", flags: "a" });
        return stream.write(`[${mode.toUpperCase()}] ${(0, moment_1.default)().toISOString(true)}: ${message}\r\n`, (error) => {
            return this.error(error);
        });
    }
}
exports.default = { WriteTypes, Logger };
