const express = require("express");
const router = express.Router();
const {query} = require("../Services/Query_db")

router.get('/:id_video',async function (req, res) {
    dislike = await query('SELECT * FROM reacao WHERE video =? and tipo = "dislike"',[req.params.id_video])
    res.send(dislike);
});
module.exports = router;