const client = require('./client')

client.cluster.health({},(err,resp,status) => {
    console.log("-- Client Health --",resp);
})
