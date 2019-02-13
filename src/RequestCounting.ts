import { LoadBalancingStrategy } from "./LoadBalancingStrategy";
import LoadBalancer from './LoadBalancer';

import Query from "./Query";

export default class RequestCounting extends LoadBalancingStrategy {

    loadBalancer!: LoadBalancer;

    intervalID!: NodeJS.Timeout;

    constructor() {
        super();
    }

    manageQueries() {
        if (this.loadBalancer.activeDatabaseCount < this.loadBalancer.databaseCount)
            return;

        let query = this.loadBalancer.queryList[0];
        if (!query)
            return;

        if (query.type === 'modify') {
            clearInterval(this.intervalID);
            this.loadBalancer.activeDatabaseCount = 0;
            this.loadBalancer.databases.forEach(e => e.sendQuery(query));
            this.loadBalancer.queryList.shift();
            return;
        }
        else {
            this.manageNotModifyingQueries();
        }
    }

    manageNotModifyingQueries() {
        let notModifyingQueries: Query[] = [];
        for (let q of this.loadBalancer.queryList) {
            if (q.type !== 'modify') {
                let shiftVal = this.loadBalancer.queryList.shift();
                if (shiftVal)
                    notModifyingQueries.push(shiftVal);
            }
            else
                break;
        }

        //narazie ten algorytm zakłada że współczynnik udziału jest równy i rozdziela po równo zapytania
        let shiftVal:any;
        while (notModifyingQueries.length !== 0) {
            shiftVal = notModifyingQueries.shift();
            if (shiftVal) {
                this.loadBalancer.databases.forEach(db => db.sendQuery(shiftVal))
            }
        }
    }

}