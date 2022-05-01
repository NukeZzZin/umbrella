import Discord from "discord.js";
import Command from "./command";

export default class Client extends Discord.Client {
    public commands: Discord.Collection<string, Command> = new Discord.Collection();
}