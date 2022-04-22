export default class logger {
    static success(message?: any, ..._message: any[]): void;
    static error(message?: any, ..._message: any[]): void;
    static info(message?: any, ..._message: any[]): void;
    static test(message?: any, ..._message: any[]): void;
    static write(message: any, mode: "error" | "warn" | "test" | "info"): Promise<boolean>;
}
