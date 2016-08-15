
export class Player {

    constructor(private client: SocketIO.Socket, private uuid: string) {}

    public getUUID(): string {
        return this.uuid;
    }

}