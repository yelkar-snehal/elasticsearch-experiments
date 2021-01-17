const faker = require('faker')
const fs = require('fs')

// Table data as an array of objects
const data = new Array(100).fill(true).map(() => ({
    department: faker.commerce.department(),
    productName: faker.commerce.productName(),
    price: faker.commerce.price(),
    productAdjective: faker.commerce.productAdjective(),
    productMaterial: faker.commerce.productMaterial(),
    product: faker.commerce.product(),
    productDescription: faker.commerce.productDescription(),
    color: faker.commerce.color(),
    id: faker.random.alphaNumeric(11),
    quantities: faker.random.arrayElements([10, 20], 2),
    isSynced: 1,
    door: 1
}))

fs.writeFileSync("data.json", JSON.stringify(data))
