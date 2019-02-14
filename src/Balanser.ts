const LoadBalancer = require("./LoadBalancer").LoadBalancer;
import {DatabaseOptions} from "./DatabaseOptions";

export default class Balanser {

    constructor(){
        LoadBalancer.getInstance();
        this.setStrategy('DNSDelegation');
    }


    public setStrategy(strategy: string) {
        LoadBalancer.getInstance().setStrategy(strategy);
    }

    public sendQuery(query: string, callback = (res: any)=>{}, databasePort = ''): void {
        LoadBalancer.getInstance().sendQuery(query, callback, databasePort)
    }

    public addDatabase(options: DatabaseOptions): void {
        LoadBalancer.getInstance().addDatabase(options)
    }

    public deleteDatabase(port: string): boolean {
        return LoadBalancer.getInstance().deleteDatabase(port);
    }
}