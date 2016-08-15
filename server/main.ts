/// <reference path="../typings/tsd.d.ts"/>
/// <reference path="./core/definition/reflect-metadata.ts"/>
"use strict";
import "reflect-metadata";
import {Kernel} from "./core/Kernel";
import {Injector} from "./core/injector/Injector";

let kernel = new Kernel();
kernel.setInjectorClass(Injector);
kernel.boot();