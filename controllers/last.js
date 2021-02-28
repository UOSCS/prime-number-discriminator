const Prime = require("../models/prime")

exports.getLast = () => {
    return new Promise((resolve, reject) => {
        Prime
        .find(function (err, value) {
            if (err)
                reject(err)
            else
                resolve(value)
        })
        .sort({ time: -1 })
        .limit(10)
    })
}