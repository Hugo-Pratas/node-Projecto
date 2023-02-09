const express = require("express");
const router = express.Router();
const {query} = require("../Services/Query_db")

//IGUAL AO DRUPAL

router.get('/', async function (req, res) {
    thematics = await query("SELECT * FROM TEMATICA");
    for (let thematic of thematics) {
        tagsarray = await query ("SELECT tag FROM tags_tematica WHERE tematica = ?", [thematic.id])
        tags = [];
        for (let tag of tagsarray) {
            tags.push(tag.tag)
        }
        thematic.tags = tags.join(", ")
        thematic.id = thematic.id.toString();
    }
    res.send(thematics);
});

router.get('/suggested', async function (req, res) {
    suggestedThematic = await query("SELECT * FROM TEMATICA");
    let id_thematic = Math.floor(Math.random() * (suggestedThematic.length));
    suggestedThematic[0].id = suggestedThematic[0].id.toString();
    res.send([suggestedThematic[id_thematic]]);
});

router.get('/:id_thematic', async function (req, res) {
    thematic = await query("SELECT * FROM TEMATICA WHERE id = ?", [req.params.id_thematic]);
    tagsarray = await query ("SELECT tag FROM tags_tematica WHERE tematica = ?", [req.params.id_thematic])
    tags = [];
    for (let tag of tagsarray) {
        tags.push(tag.tag)
    }
    thematic[0].tags = tags.join(", ")
    thematic[0].id = thematic[0].id.toString();
    res.send(thematic);
});


module.exports = router;