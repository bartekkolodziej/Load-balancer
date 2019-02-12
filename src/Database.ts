import LoadBalancer from "./LoadBalancer";

const fetch = require('node-fetch');

export default class Database {

    loadBalancer = LoadBalancer.getInstance();
    port: string;
    active: boolean;
    lastTimeResponse: number;

    constructor(options: { port: string, name: string, password: string }) {
        this.port = options.port;
        this.active = true;
        this.lastTimeResponse = 0;

    }


    public sendQuery(query: {query: string, type: string, callback: any}) {

        if(query.type === 'modify'){
            fetch('localhost:' + this.port, {method: 'POST', body: query})
                .then(res => res.json())
                .then(json => {
                    this.loadBalancer.setActieDatabaseCount()
                    query.callback(json);
                })
        }else{
            fetch('localhost:' + this.port, {method: 'POST', body: query})
                .then(res => res.json())
                .then(json => query.callback(json))
        }


    }


}