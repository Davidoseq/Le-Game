import {Player} from "./Player";

export class WorldServer {

    protected players: Player[] = [];
    
    constructor(private socketServer: SocketIO.Server) {}

    public onPlayerLogged(client: SocketIO.Socket): void {
   
    }

    public onMessage(player: Player, msg: string): void {
    
    }

    private generateUUID(): string {
      
    }

}