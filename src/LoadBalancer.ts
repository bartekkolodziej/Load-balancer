import Database from "./Database";
import {setInterval} from "timers";

const fetch = require('node-fetch');


export default class LoadBalancer {

    intervalID;
    databeseCount = 0;
    activeDatabseCount = 0;

    private static instance: LoadBalancer = new LoadBalancer();

    private databases: Database[];
    private queryList: { query: string, type: string, callback: any }[];


    private constructor() {
        LoadBalancer.instance = this;
       this.intervalID = setInterval(this.manageQueries, 100)
    }

    public static getInstance(): LoadBalancer {
        return LoadBalancer.instance;
    }

    setActieDatabaseCount(){
        this.activeDatabseCount++;
        if(this.activeDatabseCount >= this.databeseCount)
            this.intervalID = setInterval(this.manageQueries, 100);
    }
    public addDatabase(options: { port: string, name: string, password: string }): void {
        this.databases.push(new Database(options))
        this.databeseCount++;
    }

    public deleteDatabase(port: string): boolean {
        let filteredDatabases = this.databases.filter(e => e.port !== port);

        if (filteredDatabases === this.databases)
            return false;
        else {
            this.databases = filteredDatabases;
            this.databases--;
            return true;
        }
    }

    public sendQuery(query: string, callback ) {
        let type = this.getQueryType(query);
        this.queryList.push({query: query, type: type, callback: callback});
    }



    private getQueryType(query: string): string {
        query = query.toUpperCase();
        if (query.includes('DELETE') ||
            query.includes('UPDATE') ||
            query.includes('CREATE') ||
            query.includes('DROP') ||
            query.includes('INSERT'))
            return 'modify';
        else
            return 'not-modify';

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

    private manageQueries() {
        let query = this.queryList[0];
        if (!query)
            return;

        if (query.type === 'modify'){
            this.activeDatabseCount = 0;
            this.databases.forEach(e => e.sendQuery(query));
            clearInterval(this.intervalID);
            this.queryList.shift();
            return;
        }
        else {
            this.databases.forEach(e => this.checkHealth(e))
            this.databases[0].sendQuery(query);
        }
    }
    private sortDatabasesByAccesability() {
        this.databases = this.databases.sort((a, b) => a.lastTimeResponse - b.lastTimeResponse)
    }

}