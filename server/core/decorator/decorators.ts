export function makeDecorator(annotCls): any {
    function DecoratorFactory(data) {
        let annotInstance = new (<any>annotCls)(data);

        return function (target): any {
            Reflect.defineMetadata("annotations", annotInstance, target);
        };
    }

    DecoratorFactory.prototype = Object.create(annotCls.prototype);
    return DecoratorFactory;
}
