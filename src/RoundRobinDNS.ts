import {LoadBalancingStrategy} from "./LoadBalancingStrategy";
import LoadBalancer from "./LoadBalancer";

export default class RoundRobinDNS extends LoadBalancingStrategy {

    intervalID!: NodeJS.Timeout;

    constructor(){
        super();
    }

    manageQueries() {
        if( LoadBalancer.getInstance().activeDatabaseCount < LoadBalancer.getInstance().databaseCount)
            return;

        let query = LoadBalancer.getInstance().queryList[0];
        if (!query)
            return;

        if (query.type === 'modify'){
            clearInterval(this.intervalID);
            LoadBalancer.getInstance().activeDatabaseCount = 0;
            LoadBalancer.getInstance().databases.forEach(e => e.sendQuery(query));
            LoadBalancer.getInstance().queryList.shift();
            return;
        }
        else {
            let database = LoadBalancer.getInstance().databases.find(db => db.port === query.databasePort);
            if(database){
                database.sendQuery(query);
                LoadBalancer.getInstance().queryList.shift();
            }
        }
    }

}
