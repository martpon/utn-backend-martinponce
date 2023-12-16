import fs from "node:fs"

const readDatabase = () => {

    const productsBuffer = fs.readFileSync("src/database/products.json")
    const productsParsed = JSON.parse(productsBuffer.toString());

    return (productsParsed);

}

export {readDatabase}

