const Prime = require("../models/prime")

exports.getLast = (req, res) => {
    Prime
    .find(function (err, value) {
        if (err)
            console.log(err)
        else
            res.json(value)
    })
    .sort({ time: -1, _id: -1 })
    .limit(10)
}