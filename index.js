const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors())

app.use("/videos", require("./Videos/getVideos"));
app.use("/tags", require("./Tags/tags"));
app.use("/playlist", require("./Playlists/playlists"));
app.use("/like", require("./Likes/likes"));
app.use("/dislike", require("./Likes/dislikes"));
app.use("/comment_channel", require("./Comment/commentsChannel"));
app.use("/comment_video", require("./Comment/commentsVideo"));


app.listen(3000);