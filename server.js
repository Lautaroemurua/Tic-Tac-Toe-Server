/* 
* @author Lautaro Murua
* Examen tecnico Silstech
*/
'use strict';
 //Referencio las dependencias a sus respectivas constantes
const express = require("express");
const http = require('http');
const socketio = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
 
const socketEvents = require('./controllers/socket'); 
const routes = require('./routes/routes'); 
const redisDB = require("./controllers/db").connectDB();
 
//Clase Server 
class Server{
 
    constructor(){
        this.port =  process.env.PORT || 4000;
        this.host = `localhost`;
        
        this.app = express();
        this.http = http.Server(this.app);
        this.socket = socketio(this.http);
    }
 
    appConfig(){        
        this.app.use(
            bodyParser.json()
        );
        this.app.use(
            cors()
        );
    }
 
    //Incluyo las rutas de la aplicacion
    includeRoutes(){
        new routes(this.app,redisDB).routesConfig();
        new socketEvents(this.socket,redisDB).socketConfig();
    }
 
    appExecute(){
 
        this.appConfig();
        this.includeRoutes();
 
        this.http.listen(this.port, this.host, () => {
            console.log(`Listening on http://${this.host}:${this.port}`);
        });
    }
 
}
 
const app = new Server();
app.appExecute();