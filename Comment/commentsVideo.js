const express = require("express");
const router = express.Router();
const {query} = require("../Services/Query_db")

router.get('/:id_video',async function (req, res) {
    page=req.query.page
    if (!page > 0){
        page=0
    }
    page=page*10
    comments = await query("SELECT * FROM comentario WHERE video =? ORDER BY date DESC LIMIT 10 OFFSET ?",[req.params.id_video,page])
    comments.forEach(comments=>{
        comments.id=comments.id.toString();
        comments.video = comments.video.toString();
    })
    if (comments.length<1){
        res.send( [   {
            "body": "",
            "id": "",
            "date": "",
            "email": "",
            "username": ""
        }]);
    }else {
        res.send(comments)
    }

});

router.post('/:id_video',async function (req, res) {
    await query('INSERT INTO comentario(username, email, body, video) VALUES(?, ?, ?, ?)',[req.body.field_username[0].value, req.body.field_email[0].value, req.body.comment_body[0].value, req.params.id_video])
    res.json("Comentario Enviado")
});

module.exports = router;