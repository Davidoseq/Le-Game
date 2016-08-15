import {Exception} from "./Exception";

export class ImplementException extends Exception {
    constructor() {
        super("Not yet implemented, probably right time to implement it now");
    }
}