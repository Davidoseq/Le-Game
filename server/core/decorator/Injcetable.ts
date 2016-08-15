import {makeDecorator} from "./decorators";

export class InjectableMetadata {}

export interface InjectableFactory {
    (): any;
    new (): InjectableMetadata;
}

export const Injectable: InjectableFactory = <InjectableFactory>makeDecorator(InjectableMetadata);