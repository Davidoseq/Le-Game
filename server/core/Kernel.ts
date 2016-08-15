import {InjectorInterface} from "./injector/interface/InjectorInterface";
import {RuntimeException} from "./exception/RuntimeException";
import {Utils} from "./utils/Utils";
import {HttpKernel} from "./HttpKernel";
import {SocketKernel} from "./SocketKernel";
import {GameCore} from "./GameCore";

export class Kernel {

    private startTime: number;
    private injectorClass: InjectorInterface;
    private injector: InjectorInterface;
    private httpKernel: HttpKernel;
    private socketKernel: SocketKernel;
    private gameCore: GameCore;

    constructor() {
        this.startTime = process.hrtime()[0];
    }

    public boot() {
        this.initializeInjector();

        this.initializeHttpKernel();

        this.httpKernel.boot();

        this.initializeSocketKernel(this.httpKernel);

        this.socketKernel.boot();

        this.initializeGameCore(this.socketKernel.getSocketServer());
    }

    public setInjectorClass(injector: InjectorInterface): Kernel {
        this.injectorClass = injector;
        return this;
    }

    public initializeInjector(): void {
        if (!this.injectorClass)
            throw new RuntimeException(`Injector class is not set`);
        
        this.injector = Utils.instantiate<InjectorInterface>(this.injectorClass.constructor);
    }

    public initializeHttpKernel(): void {
        this.httpKernel = new HttpKernel();
    }

    public initializeSocketKernel(httpKernel: HttpKernel): void {
        this.socketKernel = new SocketKernel(httpKernel);
    }

    public initializeGameCore(socketServer: SocketIO.Server): void {
        this.gameCore = new GameCore(socketServer);
    }
}