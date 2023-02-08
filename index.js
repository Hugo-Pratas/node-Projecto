const express = require('express');
const app = express();
const cors = require('cors')

app.use(cors())
app.use("/videos", require("./Videos/getVideos"));
app.listen(3000);