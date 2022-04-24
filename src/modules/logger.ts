import chalk from "chalk";
import moment from "moment";
import util from "util";
import path from "path";
import fs from "fs";

enum WriteTypes {
    Error = "error",
    Info = "info",
    Test = "test",
    Warn = "warn"
}
possível melhoria de desempenho
// TODO: performance improvement.
class Logger {
    public static success(message?: any, ..._message: any[]): boolean {
		return process.stdout.write(`[${chalk.green("SUCCESS")}] ${chalk.bold.black(moment().format("HH:MM:SS"))} ${util.format(message)} ${util.format(..._message)}\r\n`);
    }

    public static error(message?: any, ..._message: any[]): boolean {
		return process.stdout.write(`[${chalk.red("ERROR")}] ${chalk.bold.black(moment().format("HH:MM:SS"))} ${util.format(message)} ${util.format(..._message)}\r\n`);
	}

	public static info(message?: any, ..._message: any[]): boolean {
		return process.stdout.write(`[${chalk.cyan("INFO")}] ${chalk.bold.black(moment().format("HH:MM:SS"))} ${util.format(message)} ${util.format(..._message)}\r\n`);
	}

	public static test(message?: any, ..._message: any[]): boolean {
		return process.stdout.write(`[${chalk.yellow("TEST")}] ${chalk.bold.black(moment().format("HH:MM:SS"))} ${util.format(message)} ${util.format(..._message)}\r\n`);
	}

    public static async write(mode: WriteTypes = WriteTypes.Error, message?: any, ..._message: any[]): Promise<boolean> {
        const stream = await fs.createWriteStream(path.join(__dirname, `../../logs/${mode}_${moment().format("YYYY-MM-DD")}.log`), { encoding: "utf-8", flags: "a" });
        return stream.write(`[${mode.toUpperCase()}] ${moment().toISOString(true)}: ${message}\r\n`);
    }
}

export default { WriteTypes, Logger };
