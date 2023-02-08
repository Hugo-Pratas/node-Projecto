const express = require("express");
const router = express.Router();
const {query} = require("../Services/Query_db")

router.get('/:id_channel',async function (req, res) {
    comments = await query("SELECT * FROM comentario WHERE canal =?",[req.params.id_channel])
    comments.forEach(comments=>{
        comments.id=comments.id.toString();
    })
    res.send(comments);
});
module.exports = router;