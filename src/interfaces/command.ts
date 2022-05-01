import Discord from "discord.js";
import Client from "./client";

export default class Command {
    name: string;
    run: (caller: Client, command: {
        message: Discord.Message;
        args: string[] | Array<string>;
        channel: Discord.TextChannel;
        category: Discord.CategoryChannel;
    }, ...stuff: any) => unknown | Promise<unknown>;
    constructor(name: string, run: (caller: Client, command: {
			message: Discord.Message;
			args: string[] | Array<string>;
			channel: Discord.TextChannel;
			category: Discord.CategoryChannel;
		}, ...stuff: any) => unknown | Promise<unknown>) {
        this.name = name;
        this.run = run;
    }
}