const fetch = require('node-fetch');

export default class Database {

    port: string;
    active: boolean;
    lastTimeResponse: number;

    constructor(port: string) {
        this.port = port;
        this.active = true;
        this.lastTimeResponse = 0;

    }


    public sendQuery(query: string){
        fetch('localhost:' + this.port, {method: 'POST', body: query})
            .then(res => res.json())
            .then(json => console.log(json))
    }

}