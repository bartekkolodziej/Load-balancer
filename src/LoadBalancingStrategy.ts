import LoadBalancer from "./LoadBalancer";
// const LoadBalancer = require('./LoadBalancer.ts').LoadBalancer;

import {setInterval} from "timers";


export abstract class LoadBalancingStrategy {

    intervalID: NodeJS.Timeout;

    protected constructor(){
        this.intervalID = setInterval(this.manageQueries, 100);
    }

    abstract manageQueries(): any;


    public notifyAboutActiveDB(){
        if(LoadBalancer.getInstance().activeDatabaseCount >= LoadBalancer.getInstance().databaseCount)
            this.intervalID = setInterval(this.manageQueries, 100);
    }
}
