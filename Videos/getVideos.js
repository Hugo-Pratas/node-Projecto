const express = require("express");
const router = express.Router();
const {query} = require("../Services/Query_db")
const ExcelJS = require("exceljs");

router.get('/', async function (req, res) {
    page=req.query.page
    if (!page > 0){
        page=0
    }
    page=page*10
    videos = await query("SELECT * FROM VIDEO ORDER BY data_publicacao DESC LIMIT 10 OFFSET ?",[page])
    videos_send = []
    for (const video of videos) {
        videos_send.push(await videoObject(video))
    }
    res.send(videos_send);
});
router.get('/excel', async function (req, res) {
    tabela= await query('SELECT * FROM VIDEO')
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');

    worksheet.addRow(['id', 'slug', 'canal', "titulo","url_youtube","miniatura","yt_thumbnail","descrição","duração","categoria","data_publicação"]);    tabela.forEach(rowData => {
        worksheet.addRow(Object.values(rowData));
    });

    excel= workbook.xlsx.writeFile('videos_data.xlsx')
        .then(function(file) {
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=TROJAN.xlsx');
            res.send(file)
        });
});
router.get('/:id_video', async function (req, res) {
    videos = await getVideo(req.params.id_video);
    videos_res=[]
    for (let video of videos) { //podem vir mais videos se o id video for 8,2
       videos_res.push(await videoObject(video))
    }
    res.send(videos_res)
});
router.get('/suggested/:tag_id', async function (req, res) {
    videos_tag=await query("SELECT * FROM video_tag WHERE tag_id=? ORDER BY RAND() LIMIT 10",[req.params.tag_id])
    videos = []
    for (const video of videos_tag) {
        video_db = await getVideo(video.video_id)

        videos.push(await videoObject(video_db[0]))
    }
    res.send(videos);
});
router.get('/tag/:tag_name', async function (req, res) {
    videos= await query("SELECT * FROM video_tag WHERE name=?",[req.params.tag_name])
    for (const video of videos) {
        video.video_id=video.video_id.toString()
        video.tag_id=video.tag_id.toString()
    }
    res.send(videos);
});

router.get('/tagid/:tag_id', async function (req, res) {
    videos= await query("SELECT * FROM video_tag WHERE tag_id=?",[req.params.tag_id])
    for (const video of videos) {
        video.video_id=video.video_id.toString()
        video.tag_id=video.tag_id.toString()
    }
    res.send(videos);
});



function getVideo(ids_video){
    return new Promise(async function (resolve, reject) {
        resolve(await query(`SELECT * FROM VIDEO WHERE id in(${ids_video})`)) //SQL injection
    })
}

async function videoObject(video) {  //peço desculpa aos deuses do backend mas o drupal ainda assombra o nosso frontEnd por isso isto precisa de ser string =)
    return new Promise(async resolve => {
        video_object = {};
        video_object.thumbnail = video.yt_thumbnail
        video_object.channel = video.canal.toString()
        video_object.description = video.descricao
        video_object.category = video.categoria.toString()

        //tags
        tags = await query('SELECT tag_id FROM video_tag WHERE video_id=?', [video.id])
        tags1 = []
        for (const tag of tags) { //o front end esta a espera de uma string
            tags1.push(tag.tag_id)
        }
        video_object.tags = tags1.join(", ")

        //logo
        logo = await query('SELECT logo FROM canal where id=?', [video.canal])
        video_object.channel_logo = logo[0].logo

        video_object.date = video.data_publicacao
        video_object.url = video.url_youtube
        video_object.id = video.id.toString()
        video_object.name = video.titulo
        video_object.duration = video.duracao
        resolve(video_object)
    })

}
module.exports = router;