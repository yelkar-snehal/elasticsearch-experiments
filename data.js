const faker = require('faker')
const fs = require('fs')

// Table data as an array of objects
const data = new Array(100).fill(true).map(() => ({
  id: faker.random.alphaNumeric(11),
  productName: faker.commerce.productName(),
  product: faker.commerce.product(),
  color: faker.commerce.color(),
  price: faker.commerce.price(),
  // nested
  // doors: [{ name: 'Door A', draft: 10, sizes: [{ 1: 20 }, { 2: 10 }] }, {
  //   name: 'Door B',
  //   draft: 20,
  //   sizes: [{ 1: 10 }, { 2: 10 }]
  // }]

  // parent/child
  // joins: 'product'

  // denormalized
  doorDrafts: [10, 20],
  doorNames: ['Door A', 'Door B'],
  doorSizeNames: ['Size A', 'Size B'],
  doorSizeQuantities: [10, 20]
}))

fs.writeFileSync('data.json', JSON.stringify(data))