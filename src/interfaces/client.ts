import Discord from "discord.js";
import Command from "./command";

import "dotenv/config";

export default class Client extends Discord.Client {
    public commands: Discord.Collection<string, Command> = new Discord.Collection();
	public dotenv: NodeJS.ProcessEnv = process.env;
}