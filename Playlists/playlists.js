const express = require("express");
const router = express.Router();
const {query} = require("../Services/Query_db")

router.get('/',async function (req, res) {
    playlist = await query("SELECT * FROM playlist")
    res.send(playlist);
});
router.get('/:id_playlist', async function (req, res) {
    playlistId = await query("SELECT * FROM playlist WHERE id = ?", [req.params.id_playlist]);
    res.send(playlistId);
});
module.exports = router;