import {WorldServer} from "../game/WorldServer";

/**
 * GameCore
 *
 * Můstek mezí standartníma socketServer událostma a
 * WorldServerem.
 */
export class GameCore {

    private worldServer: WorldServer;
    
    constructor(private socketServer: SocketIO.Server) {
        this.worldServer = new WorldServer(this.socketServer);
        
        this.socketServer.on("connection", (client) => this.onConnection(client));
    }

    protected onConnection(client: SocketIO.Socket): void {
        this.worldServer.onPlayerLogged(client);
    }

}