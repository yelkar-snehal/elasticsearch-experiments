const client = require('./client.js')
const { performance } = require('perf_hooks')

/**
 * gets all documents from the provided index
 * @param index
 * @returns {Promise<void>}
 */
const getAll = async (index) => {
  const t4 = performance.now()
  const { body } = await client.search({
    index,
    body: {
      query: {
        // nested: {
        //   path: 'doors',
        // query: {
        match_all: {}
        // }
        // }
      }
    }
  })
  if (body?.hits?.hits) {
    body.hits.hits.forEach(hit => {
      console.log(hit)
    })
  }
  const t5 = performance.now()
  console.log(`Reading document(s) from index: ${index} took ${t5 - t4} ms`)
}

/**
 * finds existing children of provided parent
 * of the given type
 * uses has parent query available only for
 * parent/child join in schema
 * @param index
 * @param type
 * @param match
 * @returns {Promise<void>}
 */
const getChildren = async (index, type, match) => {
  const t4 = performance.now()
  const { body } = await client.search({
    index,
    body: {
      query: {
        has_parent: {
          parent_type: type,
          query: {
            match
          }
        }
      }
    }
  })
  if (body?.hits?.hits) {
    body.hits.hits.forEach(hit => {
      console.log(hit)
    })
  }
  const t5 = performance.now()
  console.log(`Reading child document(s) from index: ${index} took ${t5 - t4} ms`)
}

/**
 * finds existing parents of provided child(ren)
 * of the given type
 * uses has child query available only for
 * parent/child join in schema
 * @param index
 * @param type
 * @param match
 * @returns {Promise<void>}
 */
const getParents = async (index, type, match) => {
  const t4 = performance.now()
  const { body } = await client.search({
    index,
    body: {
      query: {
        has_child: {
          type,
          query: {
            ...match
          },
          inner_hits: {} // get the child doc which caused the hit, along with the parent doc(s)
        }
      }
    }
  })
  if (body?.hits?.hits) {
    body.hits.hits.forEach(hit => {
      console.log(hit)
    })
  }
  const t5 = performance.now()
  console.log(`Reading parent document(s) from index: ${index} took ${t5 - t4} ms`)
}

module.exports = { getAll, getChildren, getParents }