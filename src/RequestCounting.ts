import { LoadBalancingStrategy } from "./LoadBalancingStrategy";
import Query from "./Query";
import LoadBalancer from "./LoadBalancer";

export default class RequestCounting extends LoadBalancingStrategy {

    intervalID!: NodeJS.Timeout;

    constructor() {
        super();
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
            RequestCounting.manageNotModifyingQueries();
        }
    }

    static manageNotModifyingQueries() {
        let notModifyingQueries: Query[] = [];
        for (let q of LoadBalancer.getInstance().queryList) {
            if (q.type !== 'modify') {
                let shiftVal = LoadBalancer.getInstance().queryList.shift();
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
                LoadBalancer.getInstance().databases.forEach(db => db.sendQuery(shiftVal))
            }
        }
    }

}