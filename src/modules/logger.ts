import chalk from "chalk";
import moment from "moment";
import util from "util";
import path from "path";
import fs from "fs";

export default class logger {
    public static success(message?: any, ..._message: any[]): void {
		return console.log(`[${chalk.green("SUCCESS")}] ${chalk.bold.black(moment().format("HH:MM:SS"))} ${message} ${util.format(..._message)}`);
    }

    public static error(message?: any, ..._message: any[]): void {
		return console.log(`[${chalk.red("ERROR")}] ${chalk.bold.black(moment().format("HH:MM:SS"))} ${message} ${util.format(..._message)}`);
	}

	public static info(message?: any, ..._message: any[]): void {
		return console.log(`[${chalk.cyan("INFO")}] ${chalk.bold.black(moment().format("HH:MM:SS"))} ${message} ${util.format(..._message)}`);
	}

	public static test(message?: any, ..._message: any[]): void {
		return console.log(`[${chalk.yellow("TEST")}] ${chalk.bold.black(moment().format("HH:MM:SS"))} ${message} ${util.format(..._message)}`);
	}

    public static async write(message: any, mode: "error" | "warn" | "test" | "info" ): Promise<boolean> {
        const stream = await fs.createWriteStream(path.join(__dirname, `../../logs/${mode}_${moment().format("YYYY-MM-DD")}.log`), { encoding: "utf-8", flags: "a" });
        return stream.write(`[${mode.toUpperCase()}] ${moment().toISOString(true)}: ${message}\r\n`, (error) => {
            return this.error(error);
        });
    }
}