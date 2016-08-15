import * as uuid from "node-uuid";
import {Player} from "./Player";

/**
 * WorldServer
 *
 * Střed všeho dění, zde probíhá vše důležité.
 * Připojování klientů, transform na Player a update stavu, zpracování
 * požadavků, sync na klienty.
 */
export class WorldServer {

    protected players: Player[] = [];
    
    constructor(private socketServer: SocketIO.Server) {}

    /**
     * Připojení klienta
     * 
     * @param client
     */
    public onPlayerLogged(client: SocketIO.Socket): void {

    }

    /**
     * Požadavek klienta
     *
     * @param player
     * @param msg
     */
    public onMessage(player: Player, msg: string): void {
    
    }

    /**
     * Generuje unikátní identifikátor (random)
     *
     * @returns {string}
     */
    private generateUUID(): string {
        return uuid.v4();
    }

}