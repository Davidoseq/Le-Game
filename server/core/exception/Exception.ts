

export class Exception extends Error {
    constructor(msg: string) {
        super(msg);

        (<any>Error).captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
    }
}