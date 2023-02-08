const express = require("express");
const router = express.Router();
const {query} = require("../Services/Query_db")

router.get('/',async function (req, res) {
    tag = await query("SELECT * FROM tag")
    res.send(tag);
});
module.exports = router;