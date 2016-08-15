import {Type} from "../injector/Injector";
export class Utils {

    public static isFunction(value: any): boolean {
        return typeof value === "function";
    }

    public static isDefined(value: any): boolean {
        return typeof value !== "undefined";
    }

    public static isUndefined(value: any): boolean {
        return typeof value === "undefined";
    }

    public static isPresent(value: any): boolean {
        return value !== undefined && value !== null;
    }

    public static isArray(value: any): boolean {
        return Array.isArray(value);
    }

    // public static isObject(value: any): boolean {
    //     return value !== null && (typeof value === "function" || typeof value === "object");
    // }

    public static isString(value: any): boolean {
        return typeof value === "string";
    }

    // public static isEmpty(value: Object): boolean {
    //     if (!value)
    //         return false;
    //
    //     if (Utils.isArray(value) && (<Array<any>>value).length === 0)
    //         return false;
    //     else if (!Utils.isString(value))
    //         return ObjectUtils.isEmpty(value);
    //
    //     return false;
    // }

    public static instantiate<T>(constructor: Function, args: any[] = []): T {
        args.unshift(null);
        return new (Function.prototype.bind.apply(constructor, args));
    }

    public static defineProp(obj: Object, key: string, value: any, enumerable?: boolean) {
        Object.defineProperty(obj, key, {
            value,
            enumerable: !!enumerable,
            writable: true,
            configurable: true
        });
    }

}