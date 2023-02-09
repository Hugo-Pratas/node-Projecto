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
    res.send(comments);
});
module.exports = router;