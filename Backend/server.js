
let app = require('./src/app')
let connectToDB = require('./src/db/db')


connectToDB()
app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})