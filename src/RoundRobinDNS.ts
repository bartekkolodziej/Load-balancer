import {LoadBalancingStrategy} from "./LoadBalancingStrategy";
import LoadBalancer from "./LoadBalancer";


export default class RoundRobinDNS extends LoadBalancingStrategy {

    loadBalancer: LoadBalancer;

    intervalID;

    constructor(){
        super();
    }

    manageQueries() {
        if(this.loadBalancer.activeDatabaseCount < this.loadBalancer.databaseCount)
            return;

        let query = this.loadBalancer.queryList[0];
        if (!query)
            return;

        if (query.type === 'modify'){
            clearInterval(this.intervalID);
            this.loadBalancer.activeDatabaseCount = 0;
            this.loadBalancer.databases.forEach(e => e.sendQuery(query));
            this.loadBalancer.queryList.shift();
            return;
        }
        else {
            let database = this.loadBalancer.databases.find(db => db.port === query.databasePort);
            if(database){
                database.sendQuery(query);
                this.loadBalancer.queryList.shift();
            }
                //database.sendQuery(query);
        }
    }

}
