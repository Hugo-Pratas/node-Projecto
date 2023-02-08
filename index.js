const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors())

app.use("/videos", require("./Videos/getVideos"));
app.use("/tags", require("./Tags/tags"));
app.use("/playlist", require("./Playlists/playlists"));
app.use("/like", require("./Likes/likes"));
app.use("/dislike", require("./Likes/dislikes"));




app.listen(3000);