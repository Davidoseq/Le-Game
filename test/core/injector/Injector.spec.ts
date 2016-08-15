import "reflect-metadata";
import * as chai from "chai";
var expect = chai.expect;

import {Injector} from "../../../server/core/injector/Injector";
import {Injectable} from "../../../server/core/decorator/Injcetable";
import {RuntimeException} from "../../../server/core/exception/RuntimeException";

@Injectable()
class Provider1 {}

@Injectable()
class ProviderWithDeps {
    constructor(a: Provider1) {}
}

@Injectable()
class ProviderCircular {
    constructor(a: ProviderCircular) {}
}

describe("Injector", () => {

    let injector: Injector;

    beforeEach(() => {
        injector = new Injector();
    });

    describe("register", () => {

        it("Should add type to providers map", () => {
            injector.register(Provider1);
            expect(injector.isRegistered(Provider1)).to.be.true;
        });

        it("Should throw if provider is already registered", () => {
            injector.register(Provider1);
            expect(() => injector.register(Provider1)).to.throw(RuntimeException);
        });

    });
    
    describe("get", () => {

        it("Should return instance of provided type", () => {
            injector.register(Provider1);
            expect(injector.get(Provider1)).to.be.instanceOf(Provider1);
        });

        it("Should return same instance after each next call", () => {
            injector.register(Provider1);
            let instance1 = injector.get(Provider1);
            let instance2 = injector.get(Provider1);

            expect(instance1).to.be.equal(instance2);
        });

        it("Should throw if provided type is not registered", () => {
            expect(() => injector.get(Injector)).to.throw(RuntimeException);
        });
        
    });

    describe("instantiate", () => {

        it("Should return instance of provided type", () => {
            injector.register(Provider1);
            expect(injector.instantiate(Provider1)).to.be.instanceOf(Provider1);
        });

        it("Should return new instance each call", () => {
            injector.register(Provider1);
            let instance1 = injector.instantiate(Provider1);
            let instance2 = injector.instantiate(Provider1);

            expect(instance1).not.to.be.equal(instance2);
        });

    });
    
    describe("resolveDependencies", () => {

        it("Should return collection of instance required by passed type", () => {
            injector.register(Provider1);
            injector.register(ProviderWithDeps);

            expect(injector.resolveDependencies(ProviderWithDeps)[0]).to.be.instanceOf(Provider1);
        });

        it("Should detect circular dependency and throw", () => {
            injector.register(ProviderCircular);

            expect(() => injector.resolveDependencies(ProviderCircular)).to.throw(RuntimeException);
        });
        
    });

});