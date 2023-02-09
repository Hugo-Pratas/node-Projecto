const express = require("express");
const router = express.Router();
const {query} = require("../Services/Query_db")

router.get('/:id_video',async function (req, res) {
    like = await query('SELECT Count(*) as "likes" FROM reacao WHERE id_video=? and tipo = "like"',[req.params.id_video])
    like[0].likes= like[0].likes.toString()
    res.send(like);
});
module.exports = router;