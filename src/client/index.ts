import logger from "../modules/logger";
import Discord from "discord.js";

import "dotenv/config";

const client = new Discord.Client({
    intents: [new Discord.Intents(0x7FFF)]
});

client.on("ready", () => {
    logger.success(`Bot running processID is 0x${process.pid.toString(16)} (${process.pid}).`);
    logger.info(`Bot running in version ${process.env.VERSION}.`);
    logger.info(`Released under the ${process.env.LICENSE}.`);
    logger.info(`Bot invite link is https://discord.com/oauth2/authorize?client_id=${process.env.DISCORD_ID}&scope=bot&permissions=2080374975.`);
});

process.on("uncaughtException", (error) => {
    logger.error(error)
    return logger.write(error, "error");
});

client.login(process.env.DISCORD_TOKEN);