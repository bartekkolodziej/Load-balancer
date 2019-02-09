import Database from "./Database";
import {setInterval} from "timers";
const fetch = require('node-fetch');


export default class LoadBalancer {

    private static instance: LoadBalancer = new LoadBalancer();

    private databases: Database[];
    private queryList: string[];

    private constructor() {
        LoadBalancer.instance = this;
        setInterval(this.manageQueries, 100)
    }

    public static getInstance(): LoadBalancer {
        return LoadBalancer.instance;
    }

    public addDatabase(port: string): void {
        this.databases.push(new Database(port))
    }

    public deleteDatabase(port: string): boolean {
        let filteredDatabases = this.databases.filter(e => e.port !== port);

        if (filteredDatabases === this.databases)
            return false;
        else {
            this.databases = filteredDatabases;
            return true;
        }
    }

    public sendQuery(query: string) {
        this.queryList.push(query);
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
                console.log('Last time response', db.lastTimeResponse);
            }
            this.sortDatabasesByAccesability();
        })
    }

    private manageQueries(){
        let database = this.findSuitableDatabase();
        if(database !== undefined){
            database.sendQuery(this.queryList[0]);
            this.checkHealth(database);
            this.queryList.shift();
        }
    }

    private findSuitableDatabase(): Database {
        if(this.databases[0].active)
            return this.databases[0]
    }

    private sortDatabasesByAccesability(){
        this.databases = this.databases.sort((a, b) => a.lastTimeResponse - b.lastTimeResponse)
    }

}