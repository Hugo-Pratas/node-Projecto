const express = require("express");
const router = express.Router();
const {query} = require("../Services/Query_db")

router.get('/',async function (req, res) {
    playlists = await query("SELECT * FROM playlist")

    for (let playlist of playlists) {
        let slugs= await query("SELECT video FROM playlist_video WHERE playlist = ?", [playlist.id])
        let slugJoin=[]
        for (const slug of slugs) {
            slugJoin.push(slug.video)
        }
        slugJoin=slugJoin.join('\", \"')
        slugJoin= '\"'+slugJoin+'\"'
        videos = await query(`SELECT * FROM VIDEO WHERE slug in(${slugJoin})`)
        tags1 = []
        for (const video of videos) { //o front end esta a espera de uma string
            tags1.push(video.id)
        }
        playlist.videos = tags1.join(", ")
        playlist.id=playlist.id.toString();
        playlist.category=playlist.category.toString();
        playlist.id=playlist.id.toString();
        playlist.category=playlist.category.toString();
    }
    res.send(playlists);
});
router.get('/:id_playlist', async function (req, res) {
    playlistId = await query("SELECT * FROM playlist WHERE id = ?", [req.params.id_playlist]);
    for (const playlists of playlistId) {
        let slugs= await query("SELECT video FROM playlist_video WHERE playlist = ?", [req.params.id_playlist])
        let slugJoin=[]
        for (const slug of slugs) {
            slugJoin.push(slug.video)
        }
        slugJoin=slugJoin.join('\", \"')
        slugJoin= '\"'+slugJoin+'\"'
        videos = await query(`SELECT * FROM VIDEO WHERE slug in(${slugJoin})`)
        tags1 = []
        for (const video of videos) { //o front end esta a espera de uma string
            tags1.push(video.id)
        }
        playlists.videos = tags1.join(", ")
        playlists.id=playlists.id.toString();
        playlists.category=playlists.category.toString();
    }
    res.send(playlistId);//falta passar id para string
});
module.exports = router;