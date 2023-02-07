const express = require('express');
const app = express();

app.use("/videos", require("./Videos/getVideos"));
app.listen(3000);