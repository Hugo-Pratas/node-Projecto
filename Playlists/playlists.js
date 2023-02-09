const express = require("express");
const router = express.Router();
const {query} = require("../Services/Query_db")

router.get('/',async function (req, res) {
    playlist = await query("SELECT * FROM playlist")
    playlist.forEach(playlists=>{
        playlists.id=playlists.id.toString();
        playlists.category=playlists.category.toString();
    })
    res.send(playlist);
});
router.get('/:id_playlist', async function (req, res) {
    playlistId = await query("SELECT * FROM playlist WHERE id = ?", [req.params.id_playlist]);
    playlistId.forEach(playlists=>{
        playlists.id=playlists.id.toString();
        playlists.category=playlists.category.toString();
    })
    res.send(playlistId);//falta passar id para string
});
module.exports = router;