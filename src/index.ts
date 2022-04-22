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
    logger.success(`Shard created with id 0x${shard.id.toString(16)} (${shard.id}) - [${shard.id + 1} of ${manager.totalShards}].`);
});

manager.spawn().catch((error) => {
    logger.error(error);
    return logger.write(error, "error");
});