const express = require("express");
const router = express.Router();
const {query} = require("../Services/Query_db")

router.get('/', async function (req, res) {
    thematics = await query("SELECT * FROM TEMATICA");
    res.send(thematics);
});

router.get('/:id_thematic', async function (req, res) {
    thematic = await query("SELECT * FROM TEMATICA WHERE id = ?", [req.params.id_thematic]);
    res.send(thematic);
});

module.exports = router;