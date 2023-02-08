const express = require("express");
const router = express.Router();
const {query} = require("../Services/Query_db")

router.get('/:id_video',async function (req, res) {
    like = await query('SELECT * FROM reacao WHERE video=? and tipo = "like"',[req.params.id_video])
    likes = like.length
    res.send(likes.JSON);
});
module.exports = router;