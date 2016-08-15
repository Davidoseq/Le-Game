import {Type} from "../Injector";

export interface InjectorInterface {
    get<T>(type: {new(...args: any[]): T}): T;
    instantiate<T>(type: {new(...args: any[]): T}): T;
    register(provider: Type);
    resolveDependencies(provider: Type): Type[];
}