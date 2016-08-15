import {OPCODE} from "./OPCode";

export class Player {

    constructor(private client: SocketIO.Socket, private uuid: string) {}

    public getUUID(): string {
        return this.uuid;
    }

    /**
     * Pohyb hráče
     *
     * @param x
     * @param y
     * @returns {Player}
     */
    public move(x: number, y: number): Player {
        // TODO: toto by takto fungovat nemělo.
        // Zde by měl být pouze uložen input a k updatu clientů by mělo docházet
        // ve WorldServer update loop. Tzn. že v klient části by měla probíhat
        // predikce pohybu s korekcí ze strany serveru při tiku update loop.
        this.client.broadcast.emit(OPCODE.PLAYER_MOVE, { id: this.uuid, x, y });
        return this;
    }

}