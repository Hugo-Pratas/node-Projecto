const express = require('express');
const app = express();
app.use(express.urlencoded());
app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, x-ijt");
    res.header('Access-Control-Allow-Credentials', "true");

    if ('OPTIONS' === req.method) return res.sendStatus(200);
    next();
});

app.use("/videos", require("./Videos/getVideos"));
app.use("/channels", require("./Channels/getChannels"));
app.use("/thematics", require("./Thematics/getThematics"))
app.use("/tags", require("./Tags/tags"));
app.use("/playlist", require("./Playlists/playlists"));
app.use("/like", require("./Likes/likes"));
app.use("/dislike", require("./Likes/dislikes"));
app.use("/comment_channel", require("./Comment/commentsChannel"));
app.use("/comment_video", require("./Comment/commentsVideo"));

app.listen(3000);