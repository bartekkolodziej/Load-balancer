import {LoadBalancingStrategy} from "./LoadBalancingStrategy";
import LoadBalancer from "./LoadBalancer";
import Database from "./Database";
const fetch = require('node-fetch');


export default class DNSDelegation extends LoadBalancingStrategy {

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
            this.loadBalancer.databases.forEach(e => this.checkHealth(e));
            this.loadBalancer.databases[0].sendQuery(query);
        }
    }


    private sortDatabasesByAccesability() {
        this.loadBalancer.databases = this.loadBalancer.databases.sort((a, b) => a.lastTimeResponse - b.lastTimeResponse)
    }

    private checkHealth(db: Database): void {
        let t1 = new Date().getMilliseconds();
        fetch('localhost:' + db.port, {timeout: 2000}, res => {
            if (res.statusCode < 200 || res.statusCode > 299) {
                db.active = false;
                db.lastTimeResponse = 999999;
            }
            else {
                db.active = true;
                db.lastTimeResponse = new Date().getMilliseconds() - t1;
            }
            this.sortDatabasesByAccesability();
        })
    }

}