import * as uuid from "node-uuid";
import {Player} from "./Player";
import {Logger} from "../core/logger/Logger";
import {OPCODE} from "./OPCode";

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
        let player = new Player(client, this.generateUUID());
        this.players.push(player);

        Logger.log("World: client connected", player.getUUID());

        this.socketServer.emit(OPCODE.PLAYER_CONNECTED, { id: player.getUUID(), players: this.players.map((player) => player.getUUID()) });

        client.on("message", (m) => this.onMessage(player, m));

        client.on("disconnect", () => {
            Logger.log("World: client disconnected", player.getUUID());
            this.players.splice(this.players.indexOf(player), 1);
        });
    }

    /**
     * Požadavek klienta
     *
     * @param player
     * @param msg
     */
    public onMessage(player: Player, msg: string): void {
        Logger.log("World: message received", player.getUUID(), msg);

        let parsed = JSON.parse(msg);

        // zpracování konkretního OPCODE
        // TODO: tohle asi nebude to pravé, tenhle switch asi nebude úplně škálovat
        switch (parsed.type) {
            case OPCODE.PLAYER_MOVE:
                player.move(parsed.x, parsed.y);
                break;
        }
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