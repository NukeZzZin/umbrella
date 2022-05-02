import Command from "../../../interfaces/command";

export default new Command("ping", async (client, interaction ) => {
	interaction.channel.send(`${client.ws.ping}ms`)
});