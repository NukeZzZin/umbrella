"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./modules/logger"));
const discord_js_1 = __importDefault(require("discord.js"));
const path = __importStar(require("path"));
const os = __importStar(require("os"));
require("dotenv/config");
const manager = new discord_js_1.default.ShardingManager(path.resolve(__dirname, "../build/client/index.js"), {
    totalShards: os.cpus().length,
    token: process.env.DISCORD_TOKEN,
    respawn: true
});
manager.on("shardCreate", (shard) => {
    console.clear();
    logger_1.default.Logger.success(`Shard created with id 0x${shard.id.toString(16)} (${shard.id}) - [${shard.id + 1} of ${manager.totalShards}].`);
});
manager.spawn().catch((error) => {
    logger_1.default.Logger.error(error);
    return logger_1.default.Logger.write(error, "error");
});
