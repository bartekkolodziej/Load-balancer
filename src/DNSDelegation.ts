import {LoadBalancingStrategy} from "./LoadBalancingStrategy";
import Database from "./Database";
import LoadBalancer from "./LoadBalancer";

const fetch = require('node-fetch');


export default class DNSDelegation extends LoadBalancingStrategy {


    constructor() {
        super();
    }

    static checkHealth(database: Database): void {
        let t1 = new Date().getMilliseconds();
        database.db.any('SELECT * FROM actor')
            .then(res => {
                console.log(res);
                database.lastTimeResponse = new Date().getMilliseconds() - t1;
                this.sortDatabasesByAccesability();
            });

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
