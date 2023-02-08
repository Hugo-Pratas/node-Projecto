const express = require('express');
const app = express();

app.use("/videos", require("./Videos/getVideos"));
app.use("/channels", require("./Channels/getChannels"));
app.use("/thematics", require("./Thematics/getThematics"))



app.listen(3000);