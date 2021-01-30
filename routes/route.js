const express = require("express")
const router = express.Router()

const UpdateHandler = require("../controllers/updatelast")
const LastHandler = require("../controllers/last")
const RankHandler = require("../controllers/rank")

router.get("/", (req, res) => {
    res.render("index")
})
router.get("/last", (req, res) => {
    LastHandler.getLast(req, res)
})
router.get("/rank", (req, res) => {
    RankHandler.getRank(req, res)
})
router.post("/update_last", (req, res) => {
    UpdateHandler.updateLast(req, res)
})

module.exports = router