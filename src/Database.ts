import LoadBalancer from "./LoadBalancer";
import Query from "./Query";
import {DatabaseOptions} from "./DatabaseOptions";

const pgp = require('pg-promise')(/*options*/);

export default class Database{

    loadBalancer = LoadBalancer.getInstance();
    queryRate: number; //od 1 do 10
    port: number;
    userName: string;
    password: string;
    databaseName: string;
    active: boolean;
    lastTimeResponse: number;
    db: any;

    constructor(options: DatabaseOptions) {
        var cn = {
            host: 'localhost',
            port: options.port,
            database: options.databaseName,
            user: options.userName,
            password: options.password
        };
        this.loadBalancer = LoadBalancer.getInstance();
        this.db = pgp(cn);
        this.userName = options.userName;
        this.databaseName = options.databaseName;
        this.password = options.password;
        this.port = options.port;
        this.active = true;
        this.lastTimeResponse = 0;
        this.queryRate = 1; 
    }

    public sendQuery(query: Query) {
        if (query.type === 'modify') {
            this.db.none(query.query, query.parameters)
                .then((json: any) => {
                    this.loadBalancer.setActiveDatabaseCount();
                })
                .catch((error: any) => {
                    console.log('ERROR:', error)
                })
        } else {
            this.db.any(query.query, query.parameters)
                .then((json: any) => {
                    query.callback(json)
                })
                .catch((error: any) => {
                    console.log('ERROR:', error)
                })
        }

    }
}