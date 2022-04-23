declare enum WriteTypes {
    Error = "error",
    Info = "info",
    Test = "test",
    Warn = "warn"
}
declare class Logger {
    static success(message?: any, ..._message: any[]): void;
    static error(message?: any, ..._message: any[]): void;
    static info(message?: any, ..._message: any[]): void;
    static test(message?: any, ..._message: any[]): void;
    static write(mode?: WriteTypes, message?: any, ..._message: any[]): Promise<boolean>;
}
declare const _default: {
    WriteTypes: typeof WriteTypes;
    Logger: typeof Logger;
};
export default _default;
