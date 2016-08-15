import * as http from "http";
import {Request} from "../http/Request";
import {Response, HttpStatusCode} from "../http/Response";
import {Logger} from "./logger/Logger";

/**
 * HttpKernel
 *
 * Standartní http server
 */
export class HttpKernel {

    private server: http.Server;

    constructor() {
        this.server = http.createServer((request, response) => {
            Logger.log("HttpKernel: request", request.url);
            this.handle(new Request(request), new Response(response));
        });
    }

    public getServer(): http.Server {
        return this.server;
    }

    public boot() {
        this.server.listen({
            port: 9876
        });

        Logger.log("HttpKernel: started");
    }

    public handle(request: Request, response: Response) {
        response.setStatusCode(HttpStatusCode.HTTP_STATUS_FOUND);
        response.send();
    }
    
}