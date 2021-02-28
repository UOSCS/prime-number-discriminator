const express = require("express")
const router = express.Router()

const UpdateHandler = require("../controllers/update")
const LastHandler = require("../controllers/last")
const RankHandler = require("../controllers/rank")

router.get("/", async (req, res) => {
    const last = await LastHandler.getLast()
    const rank = await RankHandler.getRank()
    
    res.render("index", { lastList: last, rankList: rank })
})

router.post("/result", async (req, res) => {
    const result = await UpdateHandler.update(req)
    const rank = await RankHandler.getRank()

    res.json({ last: result, rank: rank })
})

module.exports = router