import LoadBalancer from "./LoadBalancer";
import {Query} from "./Query";

const fetch = require('node-fetch');

export default class Database {

    loadBalancer = LoadBalancer.getInstance();
    queryRate: number; //od 1 do 10
    port: string;
    active: boolean;
    lastTimeResponse: number;

    constructor(options: { port: string, name: string, password: string }) {
        this.port = options.port;
        this.active = true;
        this.lastTimeResponse = 0;

    }


    public sendQuery(query: Query) {

        if(query.type === 'modify'){
            fetch('localhost:' + this.port, {method: 'POST', body: query.query})
                .then(res => res.json())
                .then(json => {
                    this.loadBalancer.setActiveDatabaseCount();
                    query.callback(json);
                })
        }else{
            fetch('localhost:' + this.port, {method: 'POST', body: query.query})
                .then(res => res.json())
                .then(json => query.callback(json))
        }


    }


}