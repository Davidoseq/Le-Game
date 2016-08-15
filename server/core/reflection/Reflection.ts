export class Reflection {
    
    public static getParamTypes<T>(target: any): T {
        return Reflect.getMetadata("design:paramtypes", target);
    }
    
}