const express = require("express");
const router = express.Router();
const {query} = require("../Services/Query_db")

router.get('/:id_channel',async function (req, res) {
    page=req.query.page
    if (!page > 0){
        page=0
    }
    page=page*10
    comments = await query("SELECT * FROM comentario WHERE canal =? ORDER BY date DESC LIMIT 10 OFFSET ?",[req.params.id_channel, page])
    comments.forEach(comments=>{
        comments.id=comments.id.toString();
        comments.canal = comments.canal.toString();
    })
    res.send(comments);
});

router.post('/:id_channel',async function (req, res) {
    await query('INSERT INTO comentario(username, email, body, canal) VALUES(?, ?, ?, ?)',[req.body.field_username[0].value, req.body.field_email[0].value, req.body.comment_body[0].value, req.params.id_channel])
    res.send("ENVIOOOUUUU")
});


module.exports = router;