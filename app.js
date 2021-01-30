// .env파일 내용을 process.env로 불러오기
require('dotenv').config()
// Node.js <-> MongoDB 연결
const mongoose = require("mongoose")
const atlasUri = process.env.MONGODB_URI
mongoose.connect(atlasUri, { useNewUrlParser: true, useUnifiedTopology: true })
// Router
const router = require("./routes/route")
// Express
const express = require("express")
// Cors
const cors = require("cors")

const app = express()
const port = process.env.PORT

app.set("views", __dirname + "/views")
app.set("view engine", "ejs")
app.use(cors())
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/", router)

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
