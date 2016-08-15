import {Reflection} from "../reflection/Reflection";
import {InjectorInterface} from "./interface/InjectorInterface";
import {RuntimeException} from "../exception/RuntimeException";

export interface Type extends Function {}

export interface IProvider {
    constructor: Type;
    instance: any;
}

export class Injector implements InjectorInterface {

    private providers = new Map<Type, IProvider>();

    /**
     * Registers provider
     *
     * @param provider
     * @returns {Injector}
     */
    public register(provider: Type): Injector {
        if (this.isRegistered(provider))
            throw new RuntimeException(`Provider "${provider.name}" already registered`);

        this.providers.set(provider, {
            constructor: provider,
            instance: null
        });

        return this;
    }

    /**
     * Is provider registered?
     *
     * @param provider
     * @returns {boolean}
     */
    public isRegistered(provider: Type): boolean {
        return this.providers.has(provider);
    }

    /**
     * Return instance of passed type
     *
     * Type is instantiated and cached when
     * there is no active instance.
     *
     * @param type
     * @returns {T}
     */
    public get<T>(type: {new(...args: any[]): T}): T {
        let provider = this.providers.get(type);

        if (!provider)
            throw new RuntimeException(`Unknown provider "${type.name}"`);

        if (null === provider.instance)
            return provider.instance = this.instantiate(type);

        return provider.instance;
    }


    /**
     * Creates new instance of provided type
     *
     * @param type
     */
    public instantiate<T>(type: {new(...args: any[]): T}): T {
        let provider = this.providers.get(type);
        let constructor = provider.constructor;
        let dependencies = this.resolveDependencies(type);
        dependencies.unshift(null);

        return new (Function.prototype.bind.apply(constructor, dependencies));
    }

    /**
     * Returns collection of dependencies of required type
     *
     * @param provider
     * @returns {Type[]}
     */
    public resolveDependencies(provider: Type): Type[] {
        let deps = [];
        let depsType = Reflection.getParamTypes<any[]>(provider);

        depsType.forEach((type) => {
            if (provider === type)
                throw new RuntimeException(`Circular dependency found during instantiation of "${provider.name}"`);

            deps.push(this.get(type));
        });

        return deps;
    }

}