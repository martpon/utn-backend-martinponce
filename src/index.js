import http from "node:http";
import dotenv from "dotenv";
import fs from "node:fs"
import { readDatabase } from "./utils/utils.js";

dotenv.config();

const port = process.env.PORT ?? 3000;

const serverHttp = http.createServer((request, response) => {

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

                response.writeHead(200, { "Content-type": "application/json" });

                response.end(JSON.stringify(responseServer));

            } else {

                response.writeHead(404, { "Content-type": "text/plain" });

                response.end("Peticion incorrecta...");

            }
            break;
        case "POST":
            if (request.url === "/products") {

                const products = readDatabase();

                let body = "";

                request.on("data", (chunk) => {
                    body += chunk;
                });

                request.on("end", () => {
                    const product = JSON.parse(body);
                    products.push(product);

                    fs.writeFileSync(
                        "./src/database/products.json",
                        JSON.stringify(products)
                    );

                    response.end("Producto agregado con éxito...");
                })

            } else {

                response.writeHead(404, { "Content-type": "text/plain" });

                response.end("Peticion incorrecta...");

            }
            break;

        default:

    }



})

serverHttp.listen(port, () => {
    console.log(`server on port: ${port}`);

})