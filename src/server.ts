import Balanser from "./Balanser";
const express = require('express');
const app1 = express();

let balanser = new Balanser();

balanser.setStrategy('DNSDelegation'); // DNSDelegation RequestCounting RoundRobinDNS
balanser.addDatabase({ port: 5001, userName: 'mky4', password: 'password', databaseName: 'postgres' });
balanser.addDatabase({ port: 5002, userName: 'mky4', password: 'password', databaseName: 'postgres' });
balanser.addDatabase({ port: 5003, userName: 'mky4', password: 'password', databaseName: 'postgres' });

// results rendering
let i = 0;
const limit = 1000;
while (i < limit) {
    /**
     * DELETE FROM film_actor WHERE actor_id = $1',[124],
     * 
     * SELECT * FROM film', []
     * 
     * insert into staff (first_name, last_name, address_id, email, store_id, active, username, password) 
     * values ($1, $2, $3, $4, $5, $6, $7, $8)`, ['Maks', 'Kol333', 1, 'email@', 1, true, 'kol', 'kol123']
     *
     */
    balanser.sendQuery(`SELECT * FROM film`, [], (res: any) => {
        // console.log(res);
    });
    i++

    // //RoundRobinDNS
    // balanser.sendQuery("SELECT * from film", [], (res: any) => {
    //     //console.log(res);
    // }, (Math.floor(Math.random() * 5003) + 5001).toString());
    // i++

}
