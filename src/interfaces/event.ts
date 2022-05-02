import Discord from "discord.js";
import Client from "./client";

export default class Event {
	event: string
	run: (caller: Client, ...interaction: any) => any | Promise<any>;
	constructor(event: string, run: (caller: Client, ...interaction: any) => any | Promise<any>) {
		this.event = event;
		this.run = run;
	}
}