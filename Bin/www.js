
const app = require('../app')

const port = process.env.port|| 3888

app.listen(port,()=>{
    console.log('listening on port',port)
})