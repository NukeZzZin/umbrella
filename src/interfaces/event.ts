import Discord from "discord.js";
import Client from "./client";

export default class Event {
	event: string
	run: (caller: Client, evnet: {
		message: Discord.Message;
        args: string[] | Array<string>;
        channel: Discord.TextChannel;
        category: Discord.CategoryChannel;
	}, ...stuff: any) => void | Promise<void>;
	constructor(event: string, run: (caller: Client, command: {
			message: Discord.Message;
			args: string[] | Array<string>;
			channel: Discord.TextChannel;
			category: Discord.CategoryChannel;
		}, ...stuff: any) => void | Promise<void>) {
		this.event = event;
		this.run = run;
	}
}