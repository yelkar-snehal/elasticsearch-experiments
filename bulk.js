'use strict'

const { Client } = require('@elastic/elasticsearch')
const fs = require('fs')
const client = new Client({
    node: 'http://localhost:9200'
})


const data = fs.readFileSync('./data.json',
    { encoding: 'utf8', flag: 'r' })

console.log(data)

async function run() {
    await client.indices.create({
        index: 'tweets',
        body: {
            mappings: {
                properties: {
                    id: { type: 'integer' },
                    department: { type: 'text' },
                    productName: { type: 'keyword' },
                    price: { type: 'integer' },
                    productAdjective: { type: 'text' },
                    productMaterial: { type: 'text' },
                    product: { type: 'keyword' },
                    productDescription: { type: 'text' },
                    color: { type: 'keyword' },
                    quantities: { type: 'integer' },
                    isSynced: { type: 'integer' },
                    door: { type: 'integer' }
                }
            }
        }
    })
}