const express = require("express");
const router = express.Router();
const {query} = require("../Services/Query_db")


router.get('/:id_video',async function (req, res) {
    let like = await query('SELECT count(tipo) as "likes" FROM reacao WHERE id_video=? and tipo = "like"',[req.params.id_video])
    like[0].likes= like[0].likes.toString()
    res.json(like);
});

router.post('/:id_video',async function (req, res) {
    await query('INSERT INTO reacao(tipo, id_video) VALUES(?, ?)',["like", req.params.id_video])
    let like = await query('SELECT count(tipo) as "likes" FROM reacao WHERE id_video=? and tipo = "like"',[req.params.id_video])
    like[0].likes= like[0].likes.toString()
    res.json(like);
});

module.exports = router;