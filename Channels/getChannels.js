const express = require("express");
const router = express.Router();
const {query} = require("../Services/Query_db")

router.get('/', async function (req, res) {
     channels = await query("SELECT * FROM CANAL");
     res.send(channels);
});

router.get('/:id_channel', async function (req, res) {
     channel = await query("SELECT * FROM CANAL WHERE id = ?", [req.params.id_channel]);
     res.send(channel);
});

module.exports = router;