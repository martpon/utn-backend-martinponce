import http from "node:http";
import dotenv from "dotenv";
import {readDatabase} from "./utils/utils.js";

dotenv.config();

const port = process.env.PORT;

const serverHttp = http.createServer((request, response) => {

    const productsParsed = readDatabase();

    switch (request.method) {

        case "GET":
            
            if (request.url === "/") {

                const responseServer = {
                    "status": 200,
                    "app": "http-server-utn",
                    "routes": {
                        "index": "/",
                        "getProducts": "/products",
                        "addProducts": "/products"
                    }
                };

                response.writeHead(200, { "Content-Type": "application/json" });

                response.end(JSON.stringify(responseServer));

            } else if (request.url === "/products") {

                const responseServer = readDatabase();

                response.writeHead(200,{"Content-type": "application/json" });

                response.end(JSON.stringify(responseServer));

            } else {

                response.writeHead(404,{"Content-type": "text/plain"});
                
                response.end("Peticion incorrecta...");

            }
            break;
        case "POST":

            



    }

    

})

serverHttp.listen(port, () => {
        console.log(`server on port: ${port}`);

    })