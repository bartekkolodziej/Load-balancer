import LoadBalancer from "./LoadBalancer";
import Query from "./Query";
import {DatabaseOptions} from "./DatabaseOptions";

const fetch = require('node-fetch');
const pgp = require('pg-promise');

export default class Database{

    loadBalancer = LoadBalancer.getInstance();
    queryRate: number; //od 1 do 10
    port: string;
    userName: string;
    password: string;
    databaseName: string;
    active: boolean;
    lastTimeResponse: number;

    constructor(options: DatabaseOptions) {
        this.userName = options.userName;
        this.databaseName = options.databaseName;
        this.password = options.password;
        this.port = options.port;
        this.active = true;
        this.lastTimeResponse = 0;
        this.queryRate = 1; // wtf is this? passed 1 as default but not sure if it works
    }

    public sendQuery(query: Query) {
        var db = pgp('postgres://'+this.userName+':'+this.password+'@host:'+this.port+'/'+this.databaseName)
        if (query.type === 'modify') {
            db.one(query.query, 123)
                .then((res: any) => res.json())
                .then((json: any) => {
                    this.loadBalancer.setActiveDatabaseCount();
                    query.callback(json);
                })
                .catch(function (error) {
                    console.log('ERROR:', error)
                })
        } else {
            db.one(query.query, 123)
                .then((res: any) => res.json())
                .then((json: any) => query.callback(json))
                .catch(function (error) {
                    console.log('ERROR:', error)
                })
        }

        /*
        console.log('tutaj jestem')
        if(query.type === 'modify'){
            fetch("http://localhost:3000/world", {method: 'POST', body: query.query})
                .then((res: any) => res.json())
                .then((json: any) => {
                    this.loadBalancer.setActiveDatabaseCount();
                    query.callback(json);
                })
        }else{
            fetch("http://localhost:3000/world", {method: 'POST', body: query.query})
                .then((res: any) => res.json())
                .then((json: any) => query.callback(json))
        }
        */
    }
}