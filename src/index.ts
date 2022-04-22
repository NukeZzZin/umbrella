import logger from "./modules/logger";
import Discord from "discord.js";
import * as path from "path";
import * as os from "os";

import "dotenv/config";

const manager = new Discord.ShardingManager(path.resolve(__dirname, "../build/client/index.js"), {
    totalShards: os.cpus().length,
    token: process.env.DISCORD_TOKEN,
    respawn: true
});

manager.on("shardCreate", (shard) => {
    console.clear()
    logger.success(`Shard created with id ${shard.id.toString(16)} (${shard.id}).`);
});

manager.spawn();