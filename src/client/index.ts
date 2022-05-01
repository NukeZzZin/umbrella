import Command from "../interfaces/command";
import Client from "../interfaces/client";
import Event from "../interfaces/event";
import logger from "../modules/logger";
import Discord from "discord.js";
import * as path from "path";
import * as fs from "fs";

import "dotenv/config";

const client = new Client({
    messageCacheLifetime: 60,
    intents: [new Discord.Intents(0x7FFF)],
    allowedMentions: {
        parse: ["everyone", "roles", "users"],
        repliedUser: true
    },
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

fs.readdirSync(path.resolve(__dirname, "./handlers/events")).filter(async (file) => {
	if ([".js", ".ts"].some((value) => file.endsWith(value))) {
		try {
			let props: Event = await import(path.resolve(__dirname, `./handlers/events/${file}`));
			if ((props as any).default instanceof Event) {
				props = Object.assign((props as any).default, props);
				delete (props as any).default;
			}
			client.on(props.event, props.run);
		} catch (error) {
			return logger.Logger.write(logger.WriteTypes.Error, error);
		}
	} else return;
});

fs.readdirSync(path.resolve(__dirname, "./handlers/commands")).filter(async (file) => {
	if ([".js", ".ts"].some((value) => file.endsWith(value))) {
		try {
			let props: Command = await import(path.resolve(__dirname, `./handlers/commands/${file}`));
			if ((props as any).default instanceof Command) {
				props = Object.assign((props as any).default, props);
				delete (props as any).default;
			}
			client.commands.set(props.name, props);
		} catch (error) {
			return logger.Logger.write(logger.WriteTypes.Error, error);
		}
	} else return;
});

client.login(process.env.DISCORD_TOKEN);

process.on("unhandledRejection", (error, origin) => {
    return logger.Logger.write(logger.WriteTypes.Error, `[${origin}] - ${error}\n`);
});

process.on("uncaughtException", (error, origin) => {
    return logger.Logger.write(logger.WriteTypes.Error, `[${origin}] - ${error}\n`);
});

process.on("uncaughtExceptionMonitor", (error, origin) => {
    return logger.Logger.write(logger.WriteTypes.Error, `[${origin}] - ${error}\n`);
});