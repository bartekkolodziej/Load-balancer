import {LoadBalancingStrategy} from "./LoadBalancingStrategy";
import Database from "./Database.fake";
import LoadBalancer from "./LoadBalancer";

const fetch = require('node-fetch');


export default class DNSDelegation extends LoadBalancingStrategy {


    constructor() {
        super();
    }

    static checkHealth(db: Database): void {
        let t1 = new Date().getMilliseconds();
        fetch('http://localhost:' + db.port, {timeout: 2000})
            .then(res => {
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
            .catch(err => {
                db.active = true;
                db.lastTimeResponse = new Date().getMilliseconds() - t1;
            })
    }

    manageQueries() {

        if (LoadBalancer.getInstance().activeDatabaseCount < LoadBalancer.getInstance().databaseCount)
            return;

        let query = LoadBalancer.getInstance().queryList[0];
        if (!query)
            return;

        if (query.type === 'modify') {
            clearInterval(this.intervalID);
            LoadBalancer.getInstance().activeDatabaseCount = 0;
            LoadBalancer.getInstance().databases.forEach(e => e.sendQuery(query));
            LoadBalancer.getInstance().queryList.shift();
            return;
        }
        else {
            LoadBalancer.getInstance().databases.forEach(e => DNSDelegation.checkHealth(e));
            LoadBalancer.getInstance().databases[0].sendQuery(query);
            LoadBalancer.getInstance().queryList.shift(); // this was probably lacking
        }
    }


    static sortDatabasesByAccesability() {
        LoadBalancer.getInstance().databases = LoadBalancer.getInstance().databases.sort((a, b) => a.lastTimeResponse - b.lastTimeResponse)
    }


}
