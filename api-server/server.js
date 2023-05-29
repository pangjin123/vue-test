const config = require('./config')[process.env.NODE_ENV]; 
const express = require('express');
const http = require('http');

const app = express();
const port = config.PORT;
const cors = require('cors');

const path = require('path');
const fs = require('fs');

//옵션 설정
const corsOptions = {
    origin: 'http://localhost:8080',
    credentials: true,
};
app.use(cors(corsOptions));

//body parser
app.use(express.json());
app.use(express.urlencoded({extends : true }));

//autoRouter
const autoRouter = require('./autoRoute');
autoRouter('/api', app);

const webServer = http.createServer(app);
webServer.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})

//global settings
global.UPLOAD_PATH = path.join("upload/");
global.MEMBER_PHOTO_PATH = path.join("upload/memberPhoto");
fs.mkdirSync(MEMBER_PHOTO_PATH, { recursive: true });

//image storage
app.use("/upload/memberPhoto", express.static("upload/memberPhoto"));