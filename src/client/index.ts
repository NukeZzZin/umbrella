import Command from "../interfaces/command";
import Client from "../interfaces/client";
import Event from "../interfaces/event";
import logger from "../modules/logger";
import Discord from "discord.js";
import * as path from "path";
import * as fs from "fs";

const client = new Client({
    messageCacheLifetime: 60,
    intents: [new Discord.Intents(0x7FFF)],
    allowedMentions: {
        parse: ["everyone", "roles", "users"],
        repliedUser: true
    },
});

client.on(Discord.Constants.Events.CLIENT_READY, () => {
    logger.Logger.success(`Bot running processID is 0x${process.pid.toString(16)} (${process.pid}).`);
    logger.Logger.info(`Bot running in version ${client.dotenv.VERSION}.`);
    logger.Logger.info(`Released under the ${client.dotenv.LICENSE}.`);
    logger.Logger.info(`Bot invite link is https://discord.com/oauth2/authorize?client_id=${client.dotenv.DISCORD_ID}&scope=bot&permissions=2080374975.`);
    client.user?.setPresence({
        activities: [{
            name: "⚔️ No, I’m not feeling violent, I’m feeling creative with weapons. ⚔️",
            type: "PLAYING"
        }],
        status: "dnd"
    });
});

fs.readdirSync(path.resolve(__dirname, "./handlers/events")).filter(async (file) => {
	if ([".js", ".ts"].some((value) => file.endsWith(value))) {
		try {
			let props: Event = await import(path.resolve(__dirname, `./handlers/events/${file}`));
			if ((props as any).default instanceof Event) {
				props = Object.assign((props as any).default, props);
				delete (props as any).default;
			}
			client.on(props.event, props.run.bind(null, client));
		} catch (error) {
			return logger.Logger.write(logger.WriteTypes.Error, error);
		} finally {
			delete require.cache[path.resolve(__dirname, "./handlers/events")];
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
		} finally {
			delete require.cache[path.resolve(__dirname, "./handlers/commands")];
		}
	} else return;
});

client.login(client.dotenv.DISCORD_TOKEN);

process.on("unhandledRejection", (error, origin) => {
    return logger.Logger.write(logger.WriteTypes.Error, `[${origin}] - ${error}`);
});

process.on("uncaughtException", (error, origin) => {
    return logger.Logger.write(logger.WriteTypes.Error, `[${origin}] - ${error}`);
});

process.on("uncaughtExceptionMonitor", (error, origin) => {
    return logger.Logger.write(logger.WriteTypes.Error, `[${origin}] - ${error}`);
});