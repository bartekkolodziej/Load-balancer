import LoadBalancer from "./LoadBalancer";
// const LoadBalancer = require('./LoadBalancer.ts').LoadBalancer;

import {setInterval} from "timers";


export abstract class LoadBalancingStrategy {

    intervalID: NodeJS.Timeout;

    protected constructor(){
        this.intervalID = setTimeout(this.manageQueries, 500);
    }

    abstract manageQueries(): any;

    sendQuery(query: string, callback:any, databasePort: string = ''){
        let type = LoadBalancer.getQueryType(query);
        LoadBalancer.getInstance().queryList.push({query: query, type: type, databasePort: databasePort, callback: callback});
    }

    public notifyAboutActiveDB(){
        if(LoadBalancer.getInstance().activeDatabaseCount >= LoadBalancer.getInstance().databaseCount)
            this.intervalID = setInterval(this.manageQueries, 100);
    }
}
