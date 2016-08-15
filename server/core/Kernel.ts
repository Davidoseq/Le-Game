import {InjectorInterface} from "./injector/interface/InjectorInterface";
import {RuntimeException} from "./exception/RuntimeException";
import {Utils} from "./utils/Utils";
import {HttpKernel} from "./HttpKernel";

export class Kernel {

    private startTime: number;
    private injectorClass: InjectorInterface;
    private injector: InjectorInterface;
    private httpKernel: HttpKernel;
    
    constructor() {
        this.startTime = process.hrtime()[0];
    }

    public boot() {
        this.initializeInjector();

        this.initializeHttpKernel();

        this.httpKernel.boot();
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
    
}