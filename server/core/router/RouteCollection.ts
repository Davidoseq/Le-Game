import {Route} from "./Route";

export class RouteCollection {
    
    private routes: Map<string, Route> = new Map<string, Route>();
    
    public add(name: string, route: Route): void {
        this.routes.set(name, route);
    }
    
    public get(name: string): Route {
        return this.routes.has(name) ? this.routes.get(name) : null;
    }
    
    
    
}