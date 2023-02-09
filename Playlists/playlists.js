const express = require("express");
const router = express.Router();
const {query} = require("../Services/Query_db")
const ExcelJS = require("exceljs");

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
router.get('/excel', async function (req, res) {
    tabela= await query('SELECT * FROM PLAYLIST')
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet2');

    worksheet.addRow(['id', 'slug', 'category', "title","thumbnail","image"]);    tabela.forEach(rowData => {
        worksheet.addRow(Object.values(rowData));
    });

    excel= workbook.xlsx.writeBuffer('playlist_data.xlsx')
        .then(function(file) {
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=Playlist.xlsx');
            res.send(file)
        });
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