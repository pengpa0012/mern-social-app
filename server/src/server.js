const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const http = require('http')
const server = http.createServer(app)

const cors = require("cors")
const usersRoutes = require("./routes/users")
const accountRoutes = require("./routes/account")
const postRoutes = require("./routes/posts")
const connectDB = require("./config/db")

connectDB()

// Middleware
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())

app.use("/", accountRoutes)
app.use("/user", usersRoutes)
app.use("/post", postRoutes)

const PORT = 3000


server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
