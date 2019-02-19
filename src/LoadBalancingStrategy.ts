import LoadBalancer from "./LoadBalancer";
// const LoadBalancer = require('./LoadBalancer.ts').LoadBalancer;

import {setInterval} from "timers";


export abstract class LoadBalancingStrategy {

    intervalID: NodeJS.Timeout;

    public error = 0; 

    protected constructor(){
        this.intervalID = setInterval(this.manageQueries, 100);
    }

    abstract manageQueries(): any;

    private finalise() {
        if (this.error == 1) {
            LoadBalancer.getInstance().databases.forEach(e => e.finalise("ROLLBACK;"));
        }
        else {
            LoadBalancer.getInstance().databases.forEach(e => e.finalise("COMMIT;"));
        }
        this.error = 0;
    }

    public notifyAboutActiveDB(){
        if (LoadBalancer.getInstance().activeDatabaseCount >= LoadBalancer.getInstance().databaseCount) {
            this.finalise();
            this.intervalID = setInterval(this.manageQueries, 100);
        }
    }
}
