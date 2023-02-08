const express = require("express");
const router = express.Router();
const {query} = require("../Services/Query_db")

router.get('/', async function (req, res) {
    page=req.query.page*10
    videos = await query("SELECT * FROM VIDEO ORDER BY data_publicacao DESC LIMIT 10 OFFSET ?",[page])
    videos_send = []
    for (const video of videos) { //peço desculpa aos deuses do backend mas o drupal ainda assombra o nosso frontEnd por isso isto precisa de ser string =)
        video_object = {};
        video_object.thumbnail=""
        video_object.channel=video.canal.toString()
        video_object.description=video.descricao
        video_object.category=video.categoria.toString()
        tags = await query('SELECT tag_id FROM video_tag WHERE video_id=?',[video.id])
        tags1=[]
        for (const tag of tags) { //o front end esta a espera de uma string
            tags1.push(tag.tag_id)
        }
        video_object.tags=tags1.join(", ")

        videos_send.push(video_object)
    }
    res.send(videos_send);
});
router.get('/:id_video', async function (req, res) {
    res.send(await getVideo(req.params.id_video));
});
router.get('/suggested/:tag_id', async function (req, res) {
    videos_tag=await query("SELECT * FROM video_tag WHERE tag_id=?",[req.params.tag_id])
    videos = []
    for (const video of videos_tag) {
        video1 = await getVideo(video.video_id)
        videos.push(video1[0])
    }
    res.send(videos);
});
router.get('/tag/:tag_name', async function (req, res) {
    res.send("Criar autor");
});

router.get('/tagid/:tag_id', async function (req, res) {
    res.send("Criar autor");
});

function getVideo(id_video){
    return new Promise(async function (resolve, reject) {
        resolve(await query("SELECT * FROM VIDEO WHERE id=?", [id_video]))
    })
}
module.exports = router;