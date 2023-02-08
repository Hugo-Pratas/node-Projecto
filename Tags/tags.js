const express = require("express");
const router = express.Router();
const {query} = require("../Services/Query_db")

router.get('/',async function (req, res) {
    tags = await query('SELECT name,id as "tid" FROM tag')
    tags.forEach(tags=>{
        tags.tid=tags.tid.toString();
    })
    res.send(tags);
});
module.exports = router;