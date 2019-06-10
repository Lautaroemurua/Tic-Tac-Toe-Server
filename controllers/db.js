/* 
* @author Lautaro Murua
* Examen tecnico Silstech
*/
"use strict";
 
class redisDB{
    //Importo la libreria redis
    constructor(){
        this.redis = require("redis");
    }
    //Configuro la conexion a redis
    connectDB(){
        const client = this.redis.createClient({
                host : '127.0.0.1',
                post : 6379
            });
        //Inicio el cliente redis
        client.on("error", (err) => {
            console.log("Error " + err);
        }); 
        
        client.on("ready", (err) => {
            console.log("Ready ");
        });
        //Importo la libreria bluebird libreria de promesas
        require('bluebird').promisifyAll(client);
        return client;
    }
}
 
module.exports = new redisDB();