const express = require("express");
const router = express.Router();
const {query} = require("../Services/Query_db")


router.get('/:id_video',async function (req, res) {
    let dislike = await query('SELECT count(tipo) as "dislikes" FROM reacao WHERE id_video=? and tipo = "dislike"',[req.params.id_video])
    dislike[0].dislikes= dislike[0].dislikes.toString()
    res.json(dislike);
});

router.post('/:id_video',async function (req, res) {
    await query('INSERT INTO reacao(tipo, id_video) VALUES(?, ?)',["dislike", req.params.id_video])
    let dislike = await query('SELECT count(tipo) as "dislikes" FROM reacao WHERE id_video=? and tipo = "dislike"',[req.params.id_video])
    dislike[0].dislikes= dislike[0].dislikes.toString()
    res.json(dislike);
});

module.exports = router;