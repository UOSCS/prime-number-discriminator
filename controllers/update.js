const Prime = require("../models/prime.js")
const checkPrime = require("./util/checkPrime.js")
// For 한국 시간 표시
const moment = require("moment")
require('moment-timezone')
moment.tz.setDefault("Asia/Seoul")

exports.update = (req) => {
    return new Promise((resolve, reject) => {
        const userInput = req.body.text
        const result = checkPrime(userInput)
    
        if(result) {
            Prime
            .findOneAndUpdate(
                { num: userInput }, 
                { outcome: result, $inc: { count: 1 }, time: moment().format("YYYY-MM-DD HH:mm:ss") }, 
                { upsert: true, setDefaultsOnInsert: true, useFindAndModify: false, new: true }, 
                function (err, value) {
                    if(err) {
                        reject(err)
                    } else {
                        resolve(value)
                    }
                }
            )
        } else {
            resolve(result)
        }
    })
}