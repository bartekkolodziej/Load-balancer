import LoadBalancer from "./LoadBalancer";
import Query from "./Query";

const fetch = require('node-fetch');

export default class Database{

    loadBalancer = LoadBalancer.getInstance();
    queryRate: number; //od 1 do 10
    port: string;
    active: boolean;
    lastTimeResponse: number;

    constructor(options: any) {
        this.port = options.port;
        this.active = true;
        this.lastTimeResponse = 0;
        this.queryRate = 1; // wtf is this? passed 1 as default but not sure if it works
    }

    public sendQuery(query: Query) {
        console.log('SENDING  QUERY');
        if(query.type === 'modify'){
            fetch('localhost:' + this.port, {method: 'POST', body: query.query})
                .then((res: any) => res.json())
                .then((json: any) => {
                    this.loadBalancer.setActiveDatabaseCount();
                    query.callback(json);
                })
        }else{
            fetch('localhost:' + this.port, {method: 'POST', body: query.query})
                .then((res: any) => res.json())
                .then((json: any) => query.callback(json))
        }
    }
}