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
        let queryPerDB = Math.ceil(notModifyingQueries.length/LoadBalancer.getInstance().databaseCount);

        LoadBalancer.getInstance().databases.forEach(db => {
            for(let i=0; i< queryPerDB; i++) {
                let shiftVal = notModifyingQueries.shift();
                if(shiftVal)
                    db.sendQuery(shiftVal)
            }
        })
    }

}