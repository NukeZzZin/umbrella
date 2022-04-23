"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../modules/logger"));
const discord_js_1 = __importDefault(require("discord.js"));
require("dotenv/config");
const client = new discord_js_1.default.Client({
    intents: [new discord_js_1.default.Intents(0x7FFF)]
});
client.on("ready", () => {
    logger_1.default.Logger.success(`Bot running processID is 0x${process.pid.toString(16)} (${process.pid}).`);
    logger_1.default.Logger.info(`Bot running in version ${process.env.VERSION}.`);
    logger_1.default.Logger.info(`Released under the ${process.env.LICENSE}.`);
    logger_1.default.Logger.info(`Bot invite link is https://discord.com/oauth2/authorize?client_id=${process.env.DISCORD_ID}&scope=bot&permissions=2080374975.`);
    client.user?.setPresence({
        activities: [{
                name: "⚔️ No, I’m not feeling violent, I’m feeling creative with weapons. ⚔️",
                type: "PLAYING"
            }],
        status: "dnd"
    });
});
client.login(process.env.DISCORD_TOKEN);
process.on("uncaughtException", (error, reason) => {
    logger_1.default.Logger.error(`${error}-${reason}`);
    return logger_1.default.Logger.write(logger_1.default.WriteTypes.Error, `${error}-${reason}`);
});
exports.default = client;
