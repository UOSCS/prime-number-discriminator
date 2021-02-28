const Prime = require("../models/prime")

exports.getRank = () => {
    return new Promise((resolve, reject) => {
        Prime
        .find(function (err, value) {
            if (err)
                reject(err)
            else
                resolve(value)
        })
        .sort({ count: -1 })
        .limit(10)
    })
}