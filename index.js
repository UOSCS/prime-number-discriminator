// refer: https://expressjs.com/ko/starter/hello-world.html
const mongoose = require("mongoose")
const atlasUri = process.env.MONGODB_URI
const localUri = "mongodb://localhost:27017/primeDB"
mongoose.connect(atlasUri || localUri, { useNewUrlParser: true, useUnifiedTopology: true })

const express = require("express")
const cors = require("cors")
const moment = require("moment")
require('moment-timezone')
moment.tz.setDefault("Asia/Seoul")
const app = express()

const port = process.env.PORT || 8080

let memo = "no memo"

const primeSchema = new mongoose.Schema({
    num: Number,
    outcome: String,
    time: String,
    count: { type: Number, default: 0 }
})

const Prime = mongoose.model("Prime", primeSchema)

app.use(cors())
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.get("/last", (req, res) => {
    Prime
        .find(function (err, value) {
            if (err)
                console.log(err)
            else
                res.json(value)
        })
        .sort({ time: -1, _id: -1 })
        .limit(10)
})

app.get("/rank", (req, res) => {
    Prime
        .find(function (err, value) {
            if (err)
                console.log(err)
            else
                res.json(value)
        })
        .sort({ count: -1 })
        .limit(10)
})

app.post("/memo", (req, res) => {
    let result

    memo = req.body.text
    if(memo != parseInt(memo) || memo < 1) {
        result = "Enter a positive integer."
        res.json(result)
        return
    }
    else if(memo == 1)
        result = "False"
    else if(memo <= 3)
        result = "True"
    else {
        let check = true
        
        const squareRoot = parseInt(Math.sqrt(memo))
        for(let i = 2; i <= squareRoot; i++) {
            if((memo % i) == 0) {
                check = false
                break
            }
        }
        if(check)
            result = "True"
        else
            result = "False"
    }

    Prime
        .findOneAndUpdate(
            { num: memo }, 
            { outcome: result, $inc: { count: 1 }, time: moment().format("YYYY-MM-DD HH:mm") }, 
            { upsert: true, setDefaultsOnInsert: true, new: true }, 
            function (err, value) {
                if (err)
                    console.log(err)
                else {
                    res.json(value)
                    console.log(value)
                }
            }
        )
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
