// update

const client = require('./client.js')
const { performance } = require('perf_hooks')

const updateById = async (index, id, doc) => {
  const t1 = performance.now()
  const t = await client.update({
    index,
    id,
    body: {
      script: {
        lang: 'painless',
        source: `
        for (int i = 0; i < ctx._source.doors.length; ++i) {
              if(ctx._source.doors[i].name == params.doorName) {
                ctx._source.doors[i].draft = ${doc?.draft};
              }
            }
        `,
        // lang: 'javascript',
        // source: `ctx._source.doors.map((door, index) => { if(door.name === params.doorName) {  ctx._source.doors[index].draft = ${doc?.draft}   }  })`,
        params: {
          doorName: 'Door A'
        }
      }
    }
  })
  console.log(t)
  const t2 = performance.now()
  console.log(`Updating document by id from index: ${index} took ${t2 - t1} ms`)
}

const updateByQuery = async (index, query, doc) => {
  const t1 = performance.now()
  const t = await client.updateByQuery({
    index,
    body: {
      script: {
        lang: 'painless',
        source: `
        for (int i = 0; i < ctx._source.doors.length; ++i) {
              if(ctx._source.doors[i].name == params.doorName) {
                ctx._source.doors[i].draft = ${doc?.draft};
              }
            }
        `,
        // lang: 'javascript',
        // source: `ctx._source.doors.map((door, index) => { if(door.name === params.doorName) {  ctx._source.doors[index].draft = ${doc?.draft}   }  })`,
        params: {
          doorName: 'Door A'
        },
        ...query,
      }
    }
  })
  console.log(t)
  const t2 = performance.now()
  console.log(`Updating document(s) from index: ${index} took ${t2 - t1} ms`)
}

module.exports = { updateById, updateByQuery }