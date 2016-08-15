import {IncomingMessage} from "http";

export class Request {

    protected method: string;

    protected url: string;

    constructor(rawRequest: IncomingMessage) {
        this.method = rawRequest.method;
        this.url = rawRequest.url;
    }
    
}