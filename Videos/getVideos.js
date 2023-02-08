const express = require("express");
const router = express.Router();
const {query} = require("../Services/Query_db")
router.get('/', async function (req, res) {
    page=req.query.page*10
    videos = await query("SELECT * FROM VIDEO ORDER BY data_publicacao DESC LIMIT 10 OFFSET ?",[page])
    videos.forEach(video=>{ //peço desculpa aos deuses do backend mas o drupal ainda assombra o nosso frontEnd por isso isto precisa de ser string =)
        video.id=video.id.toString();
        video.canal=video.canal.toString();
        video.categoria=video.categoria.toString()
    })
    res.send(videos);
});
router.get('/suggested/:tag_id', async function (req, res) {
    res.send("Criar autor");
});
router.get('/tag/:tag_name', async function (req, res) {
    res.send("Criar autor");
});

router.get('/tagid/:tag_id', async function (req, res) {
    res.send("Criar autor");
});
module.exports = router;