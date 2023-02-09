const express = require("express");
const router = express.Router();
const {query} = require("../Services/Query_db")

router.get('/:id_video',async function (req, res) {
    dislike = await query('SELECT Count(*) as "dislikes" FROM reacao WHERE id_video =? and tipo = "dislike"',[req.params.id_video])
    dislike[0].dislikes= dislike[0].dislikes.toString()
    res.send(dislike);
});
module.exports = router;