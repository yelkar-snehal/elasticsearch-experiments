'use strict'

const fs = require('fs')
const { performance } = require('perf_hooks')
const client = require('./client')
const { createNested, createParentChild, createDenormalized } = require('./mappings')
const { getAll, getChildren, getParents } = require('./search')
const { updateById, updateByQuery } = require('./update')

let dataset = fs.readFileSync('./data.json',
  { encoding: 'utf8', flag: 'r' })

dataset = JSON.parse(dataset)

async function create(index) {
  const t1 = performance.now()
  // await createNested()
  // await createParentChild()
  await createDenormalized()

  const body = dataset.flatMap(doc => [{ index: { _index: index, _id: doc.id } }, doc])

  const { body: bulkResponse } = await client.bulk({ refresh: true, body })

  // if (bulkResponse.errors) {
  //   const erroredDocuments = []
  //   // The items array has the same order of the dataset we just indexed.
  //   // The presence of the `error` key indicates that the operation
  //   // that we did for the document has failed.
  //   bulkResponse.items.forEach((action, i) => {
  //     const operation = Object.keys(action)[0]
  //     if (action[operation].error) {
  //       erroredDocuments.push({
  //         // If the status is 429 it means that you can retry the document,
  //         // otherwise it's very likely a mapping error, and you should
  //         // fix the document before to try it again.
  //         status: action[operation].status,
  //         error: action[operation].error,
  //         operation: body[i * 2],
  //         document: body[i * 2 + 1]
  //       })
  //     }
  //   })
  //   console.log(erroredDocuments)
  // }
  const t2 = performance.now()
  const { body: count } = await client.count({ index })
  console.log(`Inserting ${count?.count} documents in index: ${index} took ${t2 - t1} ms`)

  // parent-child example
  // create a child for one element
  // provide parent element's id for
  // the routing field
  /*
  const parentElement = bulkResponse.items[0].index
  const temp = await client.index({
    index: parentElement._index,
    refresh: true,
    routing: parentElement._id,
    body: {
      joins: {
        name: 'door',
        parent: parentElement._id
      },
      name: 'Door A',
      draft: 10,
      sizes: [{ 1: 20 }, { 2: 10 }]
    }
  })
  const t3 = performance.now()
  console.log(`Inserting child document(s) in index: ${index} took ${t3 - t2} ms`)

  client.get({
    index: parentElement._index,
    id: temp.body._id
  }).then(ele => console.log(ele.body?._source))

  */
}

async function del(index) {
  const t1 = performance.now()
  await client.indices.delete({
    index
  })
  const t2 = performance.now()
  console.log(`Deleting the entire index: ${index} took ${t2 - t1} ms`)
}


// create('nested-products-100').catch(console.log)
// del('nested-products-100').catch(console.log)

// create('parent-child-products-100').catch(console.log)
// del('parent-child-products-100').catch(console.log)

// create('denormalized-products-100').catch(console.log)
// del('denormalized-products-100').catch(console.log)

// read
// getAll('nested-products-100').catch(console.log)
// getAll('parent-child-products-100').catch(console.log)
getAll('denormalized-products-100').catch(console.log)

// const match = {
//   id: 'qc05wg9xpe0'
// }
// getChildren('parent-child-products-100', 'product', match).catch(console.log)
// getParents('parent-child-products-100', 'door', { match_all: {} }).catch(console.log)

// update
// updateById('nested-products-100', 'qnjcileor0k', { draft: 7 }).catch(console.log)
// const query = {
//   query: {
//     match: {
//       product: 'Mouse'
//     }
//   }
// }
// updateByQuery('nested-products-100', query, { draft: 5 }).catch(console.log)