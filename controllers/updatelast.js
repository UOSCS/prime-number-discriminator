const Prime = require("../models/prime.js")
// For 한국 시간 표시
const moment = require("moment")
require('moment-timezone')
moment.tz.setDefault("Asia/Seoul")

exports.updateLast = (req, res) => {
    const memo = req.body.text
    let result = "initial value"

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
        { outcome: result, $inc: { count: 1 }, time: moment().format("YYYY-MM-DD HH:mm:ss") }, 
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
}