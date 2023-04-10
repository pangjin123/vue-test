const config = require('./config')[process.env.NODE_ENV]; 
const express = require('express');
const http = require('http');

const app = express();
const port = config.PORT;
const cors = require('cors');

//옵션 설정
let corsOptions = {
    origin: '*',
    credential: true,
};
app.use(cors(corsOptions));

//autoRouter
const autoRouter = require('./autoRoute');
autoRouter('/api', app);

const webServer = http.createServer(app);
webServer.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})

