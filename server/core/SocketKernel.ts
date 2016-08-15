import * as io from "socket.io";
import {HttpKernel} from "./HttpKernel";
import {Logger} from "./logger/Logger";

/**
 * SocketKernel
 *
 * Inicializace Socket.io
 */
export class SocketKernel {

    private socketServer: SocketIO.Server;

    constructor(private httpKernel: HttpKernel) {}

    public boot(): void {
        this.socketServer = io.listen(this.httpKernel.getServer());
        Logger.log("SocketKernel: started");
    }

    public getSocketServer(): SocketIO.Server {
        return this.socketServer;
    }

}