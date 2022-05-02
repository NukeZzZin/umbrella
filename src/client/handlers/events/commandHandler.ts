import Event from "../../../interfaces/event";
import logger from "../../../modules/logger";
import Discord from "discord.js";

export default new Event(Discord.Constants.Events.MESSAGE_CREATE, async (client, message: Discord.Message) => {
	if (!message.content.startsWith(client.dotenv.DISCORD_PREFIX!)) return;
	const args = message.content.trim().split(/ +/g);
	const command = client.commands.get(args.shift()?.slice(client.dotenv.DISCORD_PREFIX?.length).toLocaleLowerCase() as string);
	const channel = message.channel as Discord.TextChannel;
	try {
		await command?.run(client, { message, args, channel });
	} catch (error) {
		return logger.Logger.write(logger.WriteTypes.Error, error);
	}
});