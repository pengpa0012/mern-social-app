const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const http = require('http')
const server = http.createServer(app)

const cors = require("cors")
const usersRoutes = require("./routes/users")
const connectDB = require("./config/db")

connectDB()

// Middleware
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())

app.use("/users", usersRoutes)

const PORT = 3000


server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
