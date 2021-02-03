const client = require('./client')

// Managing relations in elasticsearch

// Nested type must be explicitly declared
// documents can be accessed using a nested query
/**
 * creates an index for nested pattern
 * @returns {Promise<void>}
 */
const createNested = async () => {
  await client.indices.create({
    index: 'nested-products-100',
    body: {
      mappings: {
        properties: {
          id: { type: 'keyword' },
          productName: { type: 'keyword' },
          product: { type: 'keyword' },
          color: { type: 'keyword' },
          price: { type: 'integer' },
          doors: { type: 'nested' }
        }
      }
    }
  }, { ignore: 400 })
}

// join data type creates a special parent/child
// relation within documents of same index
// relations within the document from parent -> child
// only one join field allowed per index
// An element can have multiple children but only one parent
// if your data contains a one-to-many relationship
// where one entity significantly outnumbers the other entity
/**
 * creates an index for parent/child relation
 * @returns {Promise<void>}
 */
const createParentChild = async () => {
  await client.indices.create({
    index: 'parent-child-products-100',
    body: {
      mappings: {
        properties: {
          id: { type: 'keyword' },
          productName: { type: 'keyword' },
          product: { type: 'keyword' },
          color: { type: 'keyword' },
          price: { type: 'integer' },
          joins: {
            type: 'join',
            relations: {
              product: 'door'
            }
          }
        }
      }
    }
  }, { ignore: 400 })
}


// de-normalization
/**
 * creates an index for denormalized document
 * @returns {Promise<void>}
 */
const createDenormalized = async () => {
  await client.indices.create({
    index: 'denormalized-products-100',
    body: {
      mappings: {
        properties: {
          id: { type: 'keyword' },
          productName: { type: 'keyword' },
          product: { type: 'keyword' },
          color: { type: 'keyword' },
          price: { type: 'integer' },
          doorDrafts: {
            type: 'integer'
          },
          doorNames: {
            type: 'text'
          },
          doorSizeNames: {
            type: 'text'
          },
          doorSizeQuantities: {
            type: 'integer'
          }
        }
      }
    }
  }, { ignore: 400 })
}
module.exports = { createNested, createParentChild, createDenormalized }