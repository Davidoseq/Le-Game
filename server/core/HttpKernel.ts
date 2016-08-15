import * as http from "http";
import {Request} from "../http/Request";
import {Response, HttpStatusCode} from "../http/Response";

export class HttpKernel {

    private server: http.Server;

    constructor() {
        this.server = http.createServer((request, response) => {
            console.log("request");
            this.handle(new Request(request), new Response(response));
        });
    }

    public boot() {
        console.log("listening");
        this.server.listen({
            port: 9876
        });
    }

    public handle(request: Request, response: Response) {
        response.setStatusCode(HttpStatusCode.HTTP_STATUS_FOUND);
        response.send();
    }
    
}