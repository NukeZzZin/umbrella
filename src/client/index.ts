import logger from "../modules/logger";
import Discord from "discord.js";

import "dotenv/config";

const client = new Discord.Client({
    intents: [new Discord.Intents(0x7FFF)]
});

client.on("ready", () => {
    logger.Logger.success(`Bot running processID is 0x${process.pid.toString(16)} (${process.pid}).`);
    logger.Logger.info(`Bot running in version ${process.env.VERSION}.`);
    logger.Logger.info(`Released under the ${process.env.LICENSE}.`);
    logger.Logger.info(`Bot invite link is https://discord.com/oauth2/authorize?client_id=${process.env.DISCORD_ID}&scope=bot&permissions=2080374975.`);
    client.user?.setPresence({
        activities: [{
            name: "⚔️ No, I’m not feeling violent, I’m feeling creative with weapons. ⚔️",
            type: "PLAYING"
        }],
        status: "dnd"
    });
    logger.Logger.write(logger.WriteTypes.Info, `Bot or Shard running processID is 0x${process.pid.toString(16)} (${process.pid}).`)
});

client.login(process.env.DISCORD_TOKEN);

process.on("unhandledRejection", (error, origin) => {
    logger.Logger.error(`${error}-${origin}`);
    return logger.Logger.write(logger.WriteTypes.Error, `${error}-${origin}`);
});

process.on("uncaughtException", (error, origin) => {
    logger.Logger.error(`${error}-${origin}`);
    return logger.Logger.write(logger.WriteTypes.Error, `${error}-${origin}`);
});

process.on("uncaughtExceptionMonitor", (error, origin) => {
    logger.Logger.error(`${error}-${origin}`);
    return logger.Logger.write(logger.WriteTypes.Error, `${error}-${origin}`);
});