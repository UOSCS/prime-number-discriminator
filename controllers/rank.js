const Prime = require("../models/prime")

exports.getRank = (req, res) => {
    Prime
    .find(function (err, value) {
        if (err)
            console.log(err)
        else
            res.json(value)
    })
    .sort({ count: -1 })
    .limit(10)
}