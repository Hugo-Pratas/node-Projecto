const express = require("express");
const router = express.Router();
const {query} = require("../Services/Query_db")

router.get('/', async function (req, res) {
    thematics = await query("SELECT * FROM TEMATICA");
    res.send(thematics);
});

router.get('/suggested', async function (req, res) {
    suggestedThematic = await query("SELECT * FROM TEMATICA");
    let id_thematic = Math.floor(Math.random() * (suggestedThematic.length));
    console.log(id_thematic);
    res.send(suggestedThematic[id_thematic]);
});

router.get('/:id_thematic', async function (req, res) {
    thematic = await query("SELECT * FROM TEMATICA WHERE id = ?", [req.params.id_thematic]);
    res.send(thematic);
});



module.exports = router;