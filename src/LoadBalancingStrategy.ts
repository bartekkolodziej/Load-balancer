import LoadBalancer from "./LoadBalancer";
import {setInterval} from "timers";


export abstract class LoadBalancingStrategy {

    loadBalancer: LoadBalancer;

    intervalID;

    protected constructor(){
        this.loadBalancer = LoadBalancer.getInstance();
        this.intervalID = setTimeout(this.manageQueries(), 100);
    }

    abstract manageQueries();

    sendQuery(query: string, callback, databasePort: string = null){
        let type = LoadBalancer.getQueryType(query);
        this.loadBalancer.queryList.push({query: query, type: type, databasePort: databasePort, callback: callback});
    }

    public notifyAboutActiveDB(){
        if(this.loadBalancer.activeDatabaseCount >= this.loadBalancer.databaseCount)
            this.intervalID = setInterval(this.manageQueries, 100);
    }
}
