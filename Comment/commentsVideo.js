const express = require("express");
const router = express.Router();
const {query} = require("../Services/Query_db")

router.get('/:id_video',async function (req, res) {
    page=req.query.page*10
    comments = await query("SELECT * FROM comentario WHERE video =? ORDER BY data DESC LIMIT 10 OFFSET ?",[req.params.id_video,page])
    comments.forEach(comments=>{
        comments.id=comments.id.toString();
    })
    res.send(comments);
});
module.exports = router;