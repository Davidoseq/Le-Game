export class Logger {

    public static log(...args): void {
        console.log.apply(console, args);
    }

}